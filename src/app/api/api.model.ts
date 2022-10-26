
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: Role
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
    ROOT = 'root',
}

export interface UserCreateResponse {
  accessToken: string;
  user: User;
}
