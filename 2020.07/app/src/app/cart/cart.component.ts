import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Cart } from '../shared/models/cart.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: Cart;

  private readonly subscriptionDestroy$ = new Subject<boolean>();

  constructor(private readonly cartService: CartService) {}

  public ngOnInit(): void {
    this.cartService
      .getCart()
      .pipe(takeUntil(this.subscriptionDestroy$))
      .subscribe((cart: Cart) => {
        this.cart = cart;
      });
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
  }
}
