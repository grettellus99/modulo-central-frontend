import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {EntitlementFlatNode} from './entitlement-tree.model';
import {Entitlement} from '../../shared/models/entitlement';

@Component({
  selector: 'app-entitlement-tree',
  templateUrl: './entitlement-tree.component.html',
  styleUrls: ['./entitlement-tree.component.scss'],
})
export class EntitlementTreeComponent implements OnInit, OnChanges {
  @Input() selectable: boolean;
  @Input() showActions: boolean;
  @Input() entitlements: Entitlement[];

  @Output() selectionChanges: EventEmitter<Entitlement[]> = new EventEmitter<Entitlement[]>();
  @Output() edit: EventEmitter<Entitlement> = new EventEmitter<Entitlement>();
  @Output() remove: EventEmitter<Entitlement> = new EventEmitter<Entitlement>();

  flatEntitlementList: Entitlement[];

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<EntitlementFlatNode, Entitlement>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Entitlement, EntitlementFlatNode>();

  treeControl: FlatTreeControl<EntitlementFlatNode>;

  treeFlattener: MatTreeFlattener<Entitlement, EntitlementFlatNode>;

  dataSource: MatTreeFlatDataSource<Entitlement, EntitlementFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<EntitlementFlatNode>(true);

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<EntitlementFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }
  ngOnInit(): void {
    this.dataSource.data = this.entitlements;
    this.flatEntitlementList = this.treeFlattener.flattenNodes(this.entitlements);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.entitlements;
    this.flatEntitlementList = this.treeFlattener.flattenNodes(this.entitlements);
  }

  getLevel = (node: EntitlementFlatNode) => node.level;

  isExpandable = (node: EntitlementFlatNode) => node.expandable;

  getChildren = (node: Entitlement): Entitlement[] => node.children;

  hasChild = (index: number, nodeData: EntitlementFlatNode) => nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: Entitlement, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const { children, ...rest } = node;
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : { ...rest } as EntitlementFlatNode;
    flatNode.level = level;
    flatNode.expandable = !!node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: EntitlementFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child =>
      this.checklistSelection.isSelected(child),
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: EntitlementFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: EntitlementFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);

    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    this.checkAllParentsSelection(node);
    this.changeSelection();
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: EntitlementFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.changeSelection();
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: EntitlementFlatNode): void {
    let parent: EntitlementFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: EntitlementFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child),
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: EntitlementFlatNode): EntitlementFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  findParent(node: Entitlement) {
    return this.flatEntitlementList.find(item => item.id === node.parent);
  }

  buildUpwardSubTree(node: Entitlement) {
    let result = { ...node };
    let parent = this.findParent(result);
    while (parent) {
      result = {
        ...parent,
        children: parent.children ? parent.children.concat([result]) : [result],
      };
      parent = this.findParent(result);
    }
    return result;
  }

  buildTouchedNodeList() {
    const selectedNodes = this.checklistSelection.selected;
    const entNodes = this.flatEntitlementList.filter(
      item => (
        selectedNodes.some(node => node.id === item.id)
      ),
    );
    const builtTree = entNodes.map(node => this.buildUpwardSubTree(node));
    const flattenTree = this.treeFlattener.flattenNodes(builtTree);
    return flattenTree.reduce((accumulated, node) => {
      if (!accumulated.some(item => item.id === node.id)) {
        return accumulated.concat([node]);
      }
      return accumulated;
    }, []);
  }

  buildSelectionTree(nodes: Entitlement[], referenceArray) {
    return nodes.map(
      ({ id, ...rest }) =>
        ({
          id,
          ...rest,
          children: this.buildSelectionTree(
            referenceArray.filter(i => i.parent === id),
            referenceArray,
          ),
        }),
    );
  }

  changeSelection() {
    const touchedNodes = this.buildTouchedNodeList();
    const selectedTree = this.buildSelectionTree(
      touchedNodes.filter(item => !item.parent),
      touchedNodes,
    );
    this.selectionChanges.emit(selectedTree);
  }

  editNode(node) {
    this.edit.emit(this.flatNodeMap.get(node));
  }

  removeNode(node) {
    this.remove.emit(this.flatNodeMap.get(node));
  }
}
