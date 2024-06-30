export enum Role {
  // The ADMIN role has the highest priority, followed by the MODERATOR role, and finally the USER role.
  ADMIN = 'ADMIN',

  // The MODERATOR role has a higher priority than the USER role.
  MODERATOR = 'MODERATOR',

  // The USER role has a higher priority than the GUEST role.
  USER = 'USER',

  // The GUEST role has the lowest priority.
  GUEST = 'GUEST',
}
