import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchModel } from '../search/search.model';
import { NewsResult } from '../search/search.interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
	constructor(
		private _searchModel: SearchModel
	) {
	}

	public get isLoadingItems$(): Observable<boolean> {
		return this._searchModel.isLoading$;
	}

	public get isLoadingPagination$(): Observable<boolean> {
		return this._searchModel.isLoadingPagination$;
	}

	public get newsItems$(): Observable<NewsResult[]> {
		return this._searchModel.newsItems$;
	}

	public get newsItems(): NewsResult[] {
		return this._searchModel.newsItems;
	}

	public get lastSearchValue(): string {
		return this._searchModel.lastSearchValue;
	}

	public ngOnInit(): void {
		this._searchModel.searchNews();
	}

	public onInfiniteScrolled(): void {
		this._searchModel.loadNewsItems();
	}

	public trackByFn(index: number, { title }: NewsResult): string {
		return title;
	}
}
