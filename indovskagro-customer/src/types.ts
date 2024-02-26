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

export type { Product, User };
