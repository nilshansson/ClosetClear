export type ProductType = {
  id: number;
  title: string;
  category: string;
  url: string;
  createdAt: Date;
  usedAmount: number;
  countedDays: number;
};

export type ProductCardProps = {
  title: string;
  category: string;
  url: string;
  productId: number;
  usedAmount: number;
  countedDays: number;
  onDeleteAction: (productId: number) => void | Promise<void>;
};

export type CategorySelectProps = {
  onCategoryChange: (category: string) => void;
};

export interface OnAddProductProps {
  onAddProductAction: (newProduct: ProductType) => void;
}

export type ProductFormType = {
  title: string;
  category: string;
  url: string;
};
