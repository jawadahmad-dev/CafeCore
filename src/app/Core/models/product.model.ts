export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';

export interface Product {
  id?: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  purchasePrice: number;
  salePrice: number;
  quantity: number;
  unit: string;         // e.g. 'piece', 'kg', 'litre'
  barcode?: string;
  status: ProductStatus;
  lowStockThreshold: number;
  createdAt: number;
  updatedAt: number;
}
