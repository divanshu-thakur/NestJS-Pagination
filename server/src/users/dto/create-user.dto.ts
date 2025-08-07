import { User } from '../users.model';

export type CreateUserDto = Pick<User, 'name' | 'email'>;

export class CreateUsersDto {
  users: CreateUserDto[];
} 
