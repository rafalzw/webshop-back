export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export type RegisterUserResponse = {
  isSuccess: boolean;
  data: UserInterface;
};

export type UpdateUserResponse = {
  isSuccess: boolean;
};

export type GetOneUserResponse = UserInterface;
