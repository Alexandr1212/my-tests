import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from './catalog.model';
import { CatalogService } from './catalog.service';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
  * CatalogComponent отвечает за работу каталога.
  *
  * При инициализации получает каталог и запускает таймер, который возвращает обновленный каталог. Таймер при первом запуске срабатывает сразу, а при следующих каждые 15 секунд
  *
*/

const reloadTime = 15000;

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit, OnDestroy {
  public categories: Category[];
  public exchangeRate = 20;

  private readonly subscriptionDestroy$ = new Subject<boolean>();

  constructor(private readonly catalogService: CatalogService) {}

  public ngOnInit(): void {
    this.categories = this.catalogService.getCatalog();

    timer(0, reloadTime)
      .pipe(takeUntil(this.subscriptionDestroy$))
      .subscribe(() => {
        this.catalogService.reloadCatalog(this.exchangeRate);
      });
  }

  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
  }
}
