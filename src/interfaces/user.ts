export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type RegisterUserResponse = {
  isSuccess: boolean;
  data: UserInterface;
};
