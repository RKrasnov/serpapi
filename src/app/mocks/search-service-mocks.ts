import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsResult, OrganicResult } from '../search/search.interface';
import { SEARCH_ITEMS, SEARCH_NEWS_ITEMS } from './mocks.const';

@Injectable()
export class SearchServiceMocks {
	constructor() {
	}

	public search(searchValue: string, items: number): Observable<OrganicResult[]> {
		return of(SEARCH_ITEMS);
	}

	public searchNews(searchValue: string, items: number): Observable<NewsResult[]> {
		return of(SEARCH_NEWS_ITEMS);
	}
}
