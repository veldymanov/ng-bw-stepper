import { RoleDto } from './role-dto';
import { UserDto } from './user-dto';

export interface SignedInDto extends UserDto {
  auth: {
    expires_in: number;
    roles: RoleDto[];
    token: string;
  };
}
