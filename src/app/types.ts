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
