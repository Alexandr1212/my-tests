import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from '../../shared/models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less'],
})
export class CartItemComponent {
  @Input() public cartItem: CartItem;

  constructor(private readonly cartService: CartService) {}

  public plusQuantity(): void {
    this.cartService.incrementQuantity(this.cartItem);
  }

  public minusQuantity(): void {
    this.cartService.minusQuantity(this.cartItem);
  }

  public removeFromCart(): void {
    this.cartService.removeFromCart(this.cartItem);
  }
}
