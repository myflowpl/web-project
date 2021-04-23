import { User } from '../../api/api.models';

export interface Profile {
  accessToken: string;
  user: User
}
