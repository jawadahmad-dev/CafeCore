export type ExpenseCategory =
  | 'rent'
  | 'utilities'
  | 'salaries'
  | 'supplies'
  | 'maintenance'
  | 'marketing'
  | 'miscellaneous';

export interface Expense {
  id?: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;             // ISO date string YYYY-MM-DD (for easy querying/grouping)
  createdBy: string;        // uid
  createdByName: string;
  createdAt: number;
}
