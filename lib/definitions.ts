import { Blog, FeedBack, Order, OrderItem, Staff, User } from '@prisma/client';
import { Timestamp } from 'firebase/firestore/lite';

export type CommonQuery = {
  page: number | 0;
  limit: number | 10;
  sort: string | undefined;
  order: 'asc' | 'desc';
  search: string | undefined;
};

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductAsset = {
  id: number;
  productId: number;
  url: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};
export interface IStaff extends Staff {}

export interface IUser extends User {}

export interface IFeedBack extends FeedBack {
  user?: IUser;
}

export interface IOrder extends Order {
  items?: IOrderItem[];
  user?: IUser;
}

export interface IOrderItem extends OrderItem {
  product?: IProduct;
  feedbacks?: IFeedBack[];
}

export interface ICategory extends Category {
  product: IProduct;
}

export interface IBlog extends Blog {}
export interface IProductAsset extends ProductAsset {}

export interface IProduct extends Product {
  assets?: IProductAsset[];
  category?: ICategory;
  blogs?: Blog[];
  feedbacks?: IFeedBack[];
}

export interface ICartItem {
  productId: number;
  quantity: number;
  product?: IProduct;
}

export interface IBlog extends Blog {
  author?: IStaff;
  product?: IProduct;
}
