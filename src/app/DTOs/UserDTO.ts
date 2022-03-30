export class UserDTO {
  user_name: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserLoginDTO {
  user_name: string;
  password: string;
}
