import { User } from "../api/api.model";

export interface Profile {
  accessToken: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}
