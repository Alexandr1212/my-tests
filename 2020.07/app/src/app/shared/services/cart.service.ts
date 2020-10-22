import { Injectable } from '@angular/core';
import { CartItem, Cart, CartProduct } from 'src/app/shared/models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';

/**
  * CartService отвечает за работу с данными корзины.
  *
  * Модель корзины состоит из общей стоимости и массива с CartItem.
  * Данные хранятся в LocalStorage.
  *
  * Методы:
  * 1) getCart - возвращает текущее состояние корзины
  * 2) addToCart - добавляет товар в корзину, обновляет общую стоимость
  * 3) removeFromCart - удаляет товар из корзины, обновляет общую стоимость
  * 4) minusQuantity - уменьшает на 1 единицу количество товара, обновляет общую стоимость
  * 5) incrementQuantity - увеличивает на 1 единицу количество товара, обновляет общую стоимость
  * 6) clearCart - очищает корзину
  * 7) getCartItemSum - изменяет сумму товара
  * 8) calculateTotals - считает общую стоимость
  *
*/

const cartStorageKey = 'test_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart;
  private readonly cartChanged$ = new BehaviorSubject<Cart>(this.cart);

  public getCart(): Observable<Cart> {
    if (this.cart) {
      return this.cartChanged$.asObservable();
    }

    const cartFromStorage = localStorage.getItem(cartStorageKey);

    if (cartFromStorage) {
      this.cart = JSON.parse(cartFromStorage) as Cart;
    } else {
      this.cart = {
        items: [],
        totalPrice: 0,
      };
    }

    this.cartChanged$.next(this.cart);

    return this.cartChanged$;
  }

  public addToCart(product: CartProduct): void {
    const existingCartItem = this.cart.items.find(
      (item) => item.product.id === product.id
    );

    if (!existingCartItem) {
      const newCartItem = {
        priceSum: product.price,
        itemsQuantity: 1,
        product,
      };

      this.cart.items.push(newCartItem);

      this.calculateTotals();
    }
  }

  public removeFromCart(cartItem: CartItem): void {
    const index = this.cart.items.indexOf(cartItem);

    if (index > -1) {
      this.cart.items.splice(index, 1);
      this.calculateTotals();
    }
  }

  public minusQuantity(cartItem: CartItem): void {
    if (cartItem.itemsQuantity > 1) {
      cartItem.itemsQuantity = cartItem.itemsQuantity - 1;
      cartItem.priceSum = this.getCartItemSum(cartItem);
      this.calculateTotals();
    } else {
      this.removeFromCart(cartItem);
    }
  }

  public incrementQuantity(cartItem: CartItem): void {
    if (cartItem.itemsQuantity < cartItem.product.quantity) {
      cartItem.itemsQuantity = cartItem.itemsQuantity + 1;
      cartItem.priceSum = this.getCartItemSum(cartItem);
    }

    this.calculateTotals();
  }

  public clearCart(): void {
    this.cart.items = [];
    this.cart.totalPrice = 0;
    localStorage.removeItem(cartStorageKey);
    this.cartChanged$.next(this.cart);
  }

  private getCartItemSum(cartItem: CartItem) {
    return cartItem.itemsQuantity * cartItem.product.price;
  }

  private calculateTotals() {
    this.cart.totalPrice = this.cart.items.reduce(
      (total, item) => total + item.priceSum,
      0
    );

    this.cartChanged$.next(this.cart);
    localStorage.setItem(cartStorageKey, JSON.stringify(this.cart));
  }
}
