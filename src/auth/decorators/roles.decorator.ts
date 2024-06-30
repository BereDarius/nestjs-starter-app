import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/roles.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLE_KEY, role);
