import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../interfaces/user';

export const Role = (role: UserRole) => SetMetadata('role', role);
