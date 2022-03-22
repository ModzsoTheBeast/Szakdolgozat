export class UserDTO {
  user_name: string;
  password: string;
  email: string;
  full_name: string;
}

export interface UserLoginDTO {
  user_name: string;
  password: string;
}
