import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, takeUntil } from 'rxjs';
import { SearchService } from './search.service';
import { BaseComponent } from '../base.component';
import { NewsResult, NewsSearchResponse, OrganicResult, SearchResponse } from './search.interface';

@Injectable({
	providedIn: 'root'
})
export class SearchModel extends BaseComponent {
	private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();
	private _isLoadingPaginationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isLoadingPagination$: Observable<boolean> = this._isLoadingPaginationSubject.asObservable();
	private _organicItemsSubject: BehaviorSubject<OrganicResult[]> = new BehaviorSubject<OrganicResult[]>([]);
	public organicItems$: Observable<OrganicResult[]> = this._organicItemsSubject.asObservable();
	private _newsItemsSubject: BehaviorSubject<NewsResult[]> = new BehaviorSubject<NewsResult[]>([]);
	public newsItems$: Observable<NewsResult[]> = this._newsItemsSubject.asObservable();

	private _pageItems: number = 0
	private _lastSearchValue: string = '';
	private _newsItemsCount: number | undefined;
	private _organicItemsCount: number | undefined;

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
		private _searchService: SearchService
	) {
		super();
	}

	public executeSearch(searchValue: string): void {
		if (!searchValue) {
			return;
		}

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
		// @ts-ignore
		if (this.organicItems.length >= this._organicItemsCount) {
			return;
		}

		this._isLoadingPaginationSubject.next(true);

		const oldItems: OrganicResult[] = [ ...this.organicItems ];

		this._searchService.search(this._lastSearchValue, this._pageItems)
				.pipe(
					finalize(() => {
						this._isLoadingSubject.next(false);
						this._isLoadingPaginationSubject.next(false);
					}),
					takeUntil(this.componentDestroyed$)
				)
				.subscribe(
					(organicResponse: SearchResponse) => {
						this._organicItemsCount = organicResponse.search_information.total_results;

						this._updateSearchResultValues(
							organicResponse.error
								? []
								: [ ...oldItems, ...organicResponse.organic_results ]
						);
					}
				);

		this._setNextItemsPagination();
	}

	public loadNewsItems(): void {
		// @ts-ignore
		if (this.newsItems.length >= this._newsItemsCount) {
			return;
		}

		this._isLoadingPaginationSubject.next(true);

		const oldNewsItems: NewsResult[] = [ ...this.newsItems ];

		this._searchService.searchNews(this._lastSearchValue, this._pageItems)
				.pipe(
					finalize(() => {
						this._isLoadingSubject.next(false);
						this._isLoadingPaginationSubject.next(false);
					}),
					takeUntil(this.componentDestroyed$)
				)
				.subscribe(
					(newsResponse: NewsSearchResponse) => {
						this._newsItemsCount = newsResponse.search_information.total_results;

						this._updateNewsResultValues(
							newsResponse.error
								? []
								: [ ...oldNewsItems, ...newsResponse.news_results ]
						);
					}
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
		this._newsItemsCount = undefined;
		this._organicItemsCount = undefined;
		this._updateSearchResultValues([]);
		this._updateNewsResultValues([]);
		this._resetPagination();
	}
}
