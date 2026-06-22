export type InventoryType = 'IN' | 'OUT' | 'ADJUSTMENT';

export interface InventoryEntry {
  id?: string;
  productId: string;
  productName: string;
  type: InventoryType;
  quantity: number;          // positive for IN, negative for OUT stored as-is
  balanceBefore: number;
  balanceAfter: number;
  note: string;
  performedBy: string;       // uid
  performedByName: string;
  createdAt: number;
}
