import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsResult, OrganicResult } from '../search/search.interface';

@Injectable()
export class SearchModelMocks {
	public isLoading$: Observable<boolean> = of(false);
	private _organicItemsMock: OrganicResult[] = [
		{
			position: 1,
			snippet: 'string',
			title: 'string',
			displayed_link: 'string',
			link: 'string',
			about_page_link: 'string',
			cached_page_link: 'string'
		},
		{
			position: 2,
			snippet: 'string',
			title: 'string',
			displayed_link: 'string',
			link: 'string',
			about_page_link: 'string',
			cached_page_link: 'string'
		}
	];
	public organicItems$: Observable<OrganicResult[]> = of(this._organicItemsMock);
	private _newsItemsMock: NewsResult[] = [
		{
			date: 'string',
			link: 'string',
			position: 1,
			snippet: 'string',
			source: 'string',
			thumbnail: 'string',
			title: 'string'
		},
		{
			date: 'string',
			link: 'string',
			position: 2,
			snippet: 'string',
			source: 'string',
			thumbnail: 'string',
			title: 'string'
		}
	];
	public newsItems$: Observable<NewsResult[]> = of(this._newsItemsMock);

	private _lastSearchValue: string = '';

	public get lastSearchValue(): string {
		return this._lastSearchValue;
	}

	public get organicItems(): OrganicResult[] {
		return this._organicItemsMock;
	}

	public get newsItems(): NewsResult[] {
		return this._newsItemsMock;
	}

	public executeSearch(searchValue: string): void {}

	public searchNews(): void {}

	public loadItems(): void {}

	public loadNewsItems(): void {}
}
