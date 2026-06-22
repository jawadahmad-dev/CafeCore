export type UserRole = 'admin' | 'manager' | 'employee';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: number; // Unix timestamp ms
}
