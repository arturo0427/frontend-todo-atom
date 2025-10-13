export interface User {
  id: string;
  createdAt: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}
