export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;   // denormalized running total
  createdAt: number;
}
