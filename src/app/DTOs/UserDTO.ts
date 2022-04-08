export class UserDTO {
  userName: string;
  password: string;
  userEmail: string;
  firstName: string;
  lastName: string;
}

export interface UserLoginDTO {
  userName: string;
  password: string;
}

export interface UserUpdateDTO {
  user_name?: string;
  password?: string;
  email?: string;
}
