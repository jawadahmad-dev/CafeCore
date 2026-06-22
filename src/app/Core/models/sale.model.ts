export interface SaleItem {
  productId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  id?: string;
  items: SaleItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;
  customerId?: string;
  customerName?: string;
  note?: string;
  createdBy: string;       // uid
  createdByName: string;
  createdAt: number;
}
