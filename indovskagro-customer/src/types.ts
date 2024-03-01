type Product = {
  id?: string;
  title: string;
  description: string;
  mrp: number;
  price: number;
  stock: number;
  image: string;
  category: string;
};

type User = {
  fname: string;
  lname: string;
  email: string;
  phoneNo: string;
  address: string;
  authId: string;
};

type Cart = {
  userId: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export type { Product, User, Cart };
