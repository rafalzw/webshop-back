export interface UserInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  stripeCustomerId?: string;
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

export type GetAllUsersResponse = UserInterface[];
