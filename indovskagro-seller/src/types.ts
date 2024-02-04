type Product = {
  id?: string;
  title: string;
  description: string;
  mrp: number;
  price: number;
  stock: number;
  image: File | string;
};

export type { Product };
