import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NewsResult, NewsSearchResponse, OrganicResult, SearchResponse } from "./search.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private _http: HttpClient,
  ) {}

  public search(searchValue: string, items: number): Observable<OrganicResult[]> {
    return this._http.get<SearchResponse>(`/search/?q=${searchValue}&start=${items}`)
      .pipe(
        map((response: SearchResponse) => response.organic_results || []),
      );
  }

  public searchNews(searchValue: string, items: number): Observable<NewsResult[]> {
    return this._http.get<NewsSearchResponse>(`/search/?q=${searchValue}&start=${items}&tbm=nws`)
      .pipe(
        map((response: NewsSearchResponse) => response.news_results || []),
      );
  }
}
