import {Entitlement} from './entitlement';

export interface Rol {
  id?: string;
  name: string;
  active: boolean;
  entitlements?: Entitlement[];
}
