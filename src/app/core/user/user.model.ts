export interface User {
  id?: string;
  ci?: string;
  login?: string;
  email?: string;
  name?: string;
  photo?: string;
  phone?: string;
  devices?: UserDevice[];
}

export interface UserDevice {
  id?: string;
  name: string;
  mac: string;
  deviceType: 1 | 2 | 3;
  modifiedDate: Date;
  isEnabled?: boolean;
}

export function normalizeDevices(devices): UserDevice[] {
  return devices.map(({_id, ...rest}) => ({ ...rest, id: _id}));
}

export function normalizeUser({ _id, devices, ...rest }): User {
  return {
    ...rest,
    id: _id,
    devices: normalizeDevices(devices),
  };
}

export function normalizeUsers(users): User[] {
  return users.map(user => normalizeUser(user));
}
