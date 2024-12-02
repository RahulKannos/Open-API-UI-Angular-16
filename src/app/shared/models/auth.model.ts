export interface LoginResponse {
  userName: string;
  token: string;
  status: boolean;
  message: string;
}

export interface LoginModel {
  userName: string;
  password: string;
}
