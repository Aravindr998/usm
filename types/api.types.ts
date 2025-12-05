export interface User {
  _id: string;
  name: string;
  email: string;
  authId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserDetailsResponse {
  success: boolean;
  user: User;
}