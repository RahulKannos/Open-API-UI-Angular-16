import { BaseModel } from './base.model';

export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface UserListResponse {
  data: User[];
  message: string;
  status: boolean;
}
