export interface Cart {
  totalPrice: number;
  items: CartItem[];
}

export interface CartItem {
  priceSum: number;
  itemsQuantity: number;
  product: CartProduct;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
