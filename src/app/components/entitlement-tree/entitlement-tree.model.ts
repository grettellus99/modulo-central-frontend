/**
 * Node for to-do item
 */
// export class EntitlementNode {
//   name: string;
//   code: string;
//   order: number;
//   active: boolean;
//   children: EntitlementNode[];
// }

/** Flat to-do item node with expandable and level information */
export class EntitlementFlatNode {
  id: string;
  name: string;
  code: string;
  order: number;
  active: boolean;
  parent: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
// const TREE_DATA = {
//   Groceries: {
//     'Almond Meal flour': null,
//     'Organic eggs': null,
//     'Protein Powder': null,
//     Fruits: {
//       Apple: null,
//       Berries: ['Blueberry', 'Raspberry'],
//       Orange: null,
//     },
//   },
//   Reminders: [
//     'Cook dinner',
//     'Read the Material Design spec',
//     'Upgrade Application to Angular',
//   ],
// };

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
// @Injectable()
// export class EntitlementTreeSourceService {
//   dataChange = new BehaviorSubject<EntitlementNode[]>([]);
//
//   get data(): EntitlementNode[] { return this.dataChange.value; }
//
//   constructor() {
//     this.initialize();
//   }
//
//   initialize() {
//     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
//     //     file node as children.
//     // const data = this.buildFileTree(TREE_DATA);
//     const data = [
//       {
//         name: 'add',
//         code: 'code-1',
//         order: 0,
//         active: true,
//         children: [
//           {
//             name: 'add-entity',
//             code: 'add-ent1',
//             order: 0,
//             active: true,
//             children: [],
//           },
//         ],
//       },
//     ];
//     // Notify the change.
//     this.dataChange.next(data);
//   }
//
//   /**
//    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
//    * The return value is the list of `TodoItemNode`.
//    */
//   buildFileTree(obj: {[key: string]: any}): EntitlementNode[] {
//     return Object.keys(obj).reduce<EntitlementNode[]>((accumulator, key) => {
//       const value = obj[key];
//       const node = new EntitlementNode();
//       node.name = key;
//
//       if (value != null) {
//         if (typeof value === 'object') {
//           node.children = this.buildFileTree(value);
//         } else {
//           node.name = value;
//         }
//       }
//
//       return accumulator.concat(node);
//     }, []);
//   }
//
//   /** Add an item to to-do list */
//   insertItem(parent: EntitlementNode, name: string) {
//     if (parent.children) {
//       parent.children.push({name} as EntitlementNode);
//       this.dataChange.next(this.data);
//     }
//   }
//
//   updateItem(node: EntitlementNode, name: string) {
//     node.name = name;
//     this.dataChange.next(this.data);
//   }
// }
