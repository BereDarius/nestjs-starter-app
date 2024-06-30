import { RoleEnum } from '../enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';

export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLE_KEY, role);
