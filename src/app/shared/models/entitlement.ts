export interface Entitlement {
  id?: string;
  name: string;
  code: string;
  order: number;
  active: boolean;
  parent?: string;
  children?: Entitlement[];
}
