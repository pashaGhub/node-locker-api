export interface IUser {
  id?: string;
  username: string;
  password: string;
}

export interface ILockerItem {
  id?: number;
  name: string;
  user_id: string;
}
