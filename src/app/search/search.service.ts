import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewsResult, NewsSearchResponse, OrganicResult, SearchResponse } from './search.interface';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	constructor(
		private _http: HttpClient
	) {
	}

	public search(searchValue: string, items: number): Observable<SearchResponse> {
		return this._http.get<SearchResponse>(`/search/?q=${ searchValue }&start=${ items }`);
	}

	public searchNews(searchValue: string, items: number): Observable<NewsSearchResponse> {
		return this._http.get<NewsSearchResponse>(`/search/?q=${ searchValue }&start=${ items }&tbm=nws`);
	}
}
