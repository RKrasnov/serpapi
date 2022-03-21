import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchModel } from '../search/search.model';
import { OrganicResult } from '../search/search.interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	public searchControl: FormControl = new FormControl('');

	constructor(private _searchModel: SearchModel) {
	}

	public get isLoadingItems$(): Observable<boolean> {
		return this._searchModel.isLoading$;
	}

	public get isLoadingPagination$(): Observable<boolean> {
		return this._searchModel.isLoadingPagination$;
	}

	public get searchItems$(): Observable<OrganicResult[]> {
		return this._searchModel.organicItems$;
	}

	public get searchItems(): OrganicResult[] {
		return this._searchModel.organicItems;
	}

	public get lastSearchValue(): string {
		return this._searchModel.lastSearchValue;
	}

	public ngOnInit(): void {
		this._trySearch();
	}

	public search(): void {
		const searchValue: string = this.searchControl.value;

		if (!searchValue) {
			return;
		}

		this._searchModel.executeSearch(searchValue);
	}

	public onInfiniteScrolled(): void {
		this._searchModel.loadItems();
	}

	public trackByFn(index: number, { title }: OrganicResult): string {
		return title;
	}

	private _trySearch(): void {
		const searchValue: string = this._searchModel.lastSearchValue;

		if (!searchValue) {
			return;
		}

		this.searchControl.setValue(searchValue, { emitEvent: false });
		this.search();
	}
}
