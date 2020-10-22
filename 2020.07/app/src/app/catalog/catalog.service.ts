import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category, Product, Data } from 'src/app/catalog/catalog.model';
import { ArrayHelper } from '../core/array.helper';

/**
  * CatalogService отвечает за работу с данными каталога.
  *
  * Catalog состоит из категорий (Category), а категории хранят в себе товары (Product)
  * Catalog формируется при обработке двух json файлов (data.json, names.json)
  *
  * Методы:
  * 1) getCatalog - возвращает каталог
  * 2) reloadCatalog - обновляет курс доллара currentExchangeRate и возвращает новый каталог с измененными ценами
  * 3) markPriceChange, getProductById, getClassName: проверка цен на изменения, добавление нужного css класса для подсветки цены
  * 4) getData - запрос к файлу data.json
  * 5) getNames - запрос к файлу names.json
  * 6) formCategoriesFromData - формирует категории
  * 7) getProductsFromGroup - формирует и добавляет товар в категорию
  *
*/

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private catalog: Category[] = [];
  private currentExchangeRate: number;

  constructor(private readonly httpClient: HttpClient) {}

  public getCatalog(): Category[] {
    return this.catalog;
  }

  public reloadCatalog(exchangeRate: number): void {
    this.currentExchangeRate = exchangeRate;

    forkJoin([this.getData(), this.getNames()])
      .pipe(
        switchMap(([data, groups]: [Map<number, Data[]>, any]) => {
          const newCatalog = this.formCategoriesFromData(data, groups);

          if (this.catalog.length) {
            this.markPriceChange(newCatalog);

            this.catalog.splice(0, this.catalog.length);
          }

          this.catalog.push.apply(this.catalog, newCatalog);

          return newCatalog;
        })
      )
      .toPromise();
  }

  private markPriceChange(categories: Category[]): void {
    categories.forEach((category) => {
      category.products.forEach((product) => {
        const existingProduct = this.getProductById(product.id);

        if (existingProduct) {
          product.className = this.getClassName(
            existingProduct.price,
            product.price
          );
        }
      });
    });
  }

  private getProductById(productId: number): Product {
    for (const category of this.catalog) {
      const existingProduct = category.products.find((p) => p.id === productId);

      if (existingProduct) {
        return existingProduct;
      }
    }

    return null;
  }

  private getClassName(oldPrice: number, newPrice: number): string {
    if (newPrice > oldPrice) {
      return 'red';
    }

    if (newPrice < oldPrice) {
      return 'green';
    }

    return null;
  }

  private getData(): Observable<Map<number, Data[]>> {
    return this.httpClient
      .get('assets/data.json')
      .pipe(
        map(
          (data: any) =>
            ArrayHelper.groupBy(data.Value.Goods, 'G') as Map<number, Data[]>
        )
      );
  }

  private getNames(): Observable<any> {
    return this.httpClient.get('assets/names.json');
  }

  private formCategoriesFromData(
    dataList: Map<number, Data[]>,
    names: any
  ): Category[] {
    const categories = [] as Category[];

    for (const key in dataList) {
      const group = names[key];

      if (group) {
        categories.push({
          id: parseInt(key),
          name: group.G,
          products: this.getProductsFromGroup(dataList[key], group),
        } as Category);
      }
    }

    return categories;
  }

  private getProductsFromGroup(products: Data[], group: any): Product[] {
    return products.map(
      (product) =>
        ({
          id: product.T,
          name: group.B[product.T]?.N || 'NOT DEFINED NAME',
          price: Math.round(product.C * this.currentExchangeRate),
          quantity: product.P,
        } as Product)
    );
  }
}
