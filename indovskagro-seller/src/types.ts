type Product = {
  id?: string;
  title: string;
  description: string;
  mrp: number;
  price: number;
  stock: number;
  image: File | string;
  category: string;
};

type Cart = {
  userId: string;
  productId: string;
  quantity: number;
  product?: Product;
};

type Order = {
  id: string;
  orderId: string;
  userId: string;
  cartItems: Cart[];
  totalPrice: number;
  deliveryAddress: string;
  orderedDate: string;
  status: string;
  screenshotUrl?: string;
};

type User = {
  address: string;
  authId: string;
  email: string;
  fname: string;
  lname: string;
  phoneNo: string;
};

interface OrderWithUser extends Order {
  user: User;
}

export type { Product, Cart, Order, User, OrderWithUser };
