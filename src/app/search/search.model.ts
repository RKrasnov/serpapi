import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, takeUntil } from "rxjs";
import { SearchService } from "./search.service";
import { BaseComponent } from "../base.component";
import { NewsResult, OrganicResult } from "./search.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchModel extends BaseComponent {
  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _organicItemsSubject: BehaviorSubject<OrganicResult[]> = new BehaviorSubject<OrganicResult[]>([]);
  private _newsItemsSubject: BehaviorSubject<NewsResult[]> = new BehaviorSubject<NewsResult[]>([]);
  private _lastSearchValue: string = '';
  private _pageItems: number = 0;

  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();
  public organicItems$: Observable<OrganicResult[]> = this._organicItemsSubject.asObservable();
  public newsItems$: Observable<NewsResult[]> = this._newsItemsSubject.asObservable();

  public get lastSearchValue(): string {
    return this._lastSearchValue;
  }
  public get organicItems(): OrganicResult[] {
    return this._organicItemsSubject.getValue();
  }
  public get newsItems(): NewsResult[] {
    return this._newsItemsSubject.getValue();
  }

  constructor(
    private _searchService: SearchService,
  ) {
    super();
  }

  public executeSearch(searchValue: string): void {
    this._isLoadingSubject.next(true);
    this._lastSearchValue = searchValue;

    this._resetSearchValues();
    this.loadItems();
  }

  public searchNews(): void {
    if (!this._lastSearchValue) {
      return;
    }

    this._isLoadingSubject.next(true);

    this._resetSearchValues();
    this.loadNewsItems();
  }

  public loadItems(): void {
    const oldItems: OrganicResult[] = [...this.organicItems];

    this._searchService.search(this._lastSearchValue, this._pageItems).pipe(
      finalize(() => this._isLoadingSubject.next(false)),
      takeUntil(this.componentDestroyed$),
    ).subscribe(
      (newItems: OrganicResult[]) => this._updateSearchResultValues([...oldItems, ...newItems])
    );

    this._setNextItemsPagination();
  }

  public loadNewsItems(): void {
    const oldNewsItems: NewsResult[] = [...this.newsItems];

    this._searchService.searchNews(this._lastSearchValue, this._pageItems).pipe(
      finalize(() => this._isLoadingSubject.next(false)),
      takeUntil(this.componentDestroyed$),
    ).subscribe(
      (newNewsItems: NewsResult[]) => this._updateNewsResultValues([...oldNewsItems, ...newNewsItems])
    );

    this._setNextItemsPagination();
  }

  private _updateSearchResultValues(items: OrganicResult[]): void {
    this._organicItemsSubject.next(items);
  }

  private _updateNewsResultValues(items: NewsResult[]): void {
    this._newsItemsSubject.next(items);
  }

  private _setNextItemsPagination(): void {
    this._pageItems += 10;
  }

  private _resetPagination(): void {
    this._pageItems = 0;
  }

  private _resetSearchValues(): void {
    this._updateSearchResultValues([]);
    this._resetPagination();
  }
}
