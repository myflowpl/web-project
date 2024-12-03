export * from './pet.api';
import { PetApi } from './pet.api';
export * from './store.api';
import { StoreApi } from './store.api';
export * from './user.api';
import { UserApi } from './user.api';
export const APIS = [PetApi, StoreApi, UserApi];
