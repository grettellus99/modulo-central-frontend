/** Example file/folder data. */
export const files = [
  {
    name: 'Inicio',
    type: 'home',
    route: 'home',
  },
  {
    name: 'Registrar',
    type: 'description',
    route: 'register',
  },
  {
    name: 'Dispositivos',
    type: 'devices',
    route: 'devices',
  },
  {
    name: 'Guía Telefónica',
    type: 'phone_guide',
    route: 'phone-guide',
  },
  {
    name: 'Administrar',
    type: 'settings',
    route: 'admin',
    children: [
      { name: 'Usuarios', type: 'people', route: 'admin/users' },
      { name: 'Roles', type: 'label', route: 'admin/roles' },
      { name: 'Permisos', type: 'lock_open', route: 'admin/permisos' },
    ],
  },
];
