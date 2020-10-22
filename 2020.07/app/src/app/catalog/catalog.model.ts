export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  className?: string;
  inCart: boolean;
}

export interface Data {
  C: number;
  T: number;
  P: number;
}
