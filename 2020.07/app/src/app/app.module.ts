import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { ProductItemComponent } from './catalog/product-item/product-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CartComponent,
    ProductItemComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
