import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../catalog.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart, CartProduct } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() public product: Product;

  private readonly subscriptionDestroy$ = new Subject<boolean>();

  constructor(private readonly cartService: CartService) {}

  public ngOnInit(): void {
    this.cartService
      .getCart()
      .pipe(takeUntil(this.subscriptionDestroy$))
      .subscribe((cart: Cart) => {
        this.product.inCart = cart.items.some(
          (i) => i.product.id === this.product.id
        );
      });
  }

  public addToCart(product: Product): void {
    this.cartService.addToCart({ ...product } as CartProduct);
  }

  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
  }
}
