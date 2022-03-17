import { TestBed } from '@angular/core/testing';

import { SearchModel } from './search.model';
import { SearchService } from './search.service';
import { SearchServiceMocks } from '../mocks/search-service-mocks';
import { of } from 'rxjs';
import { SEARCH_ITEMS, SEARCH_NEWS_ITEMS } from '../mocks/mocks.const';

describe('SearchModel', () => {
	let model: SearchModel;
	let searchService: SearchService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SearchModel,
				{
					provide: SearchService,
					useClass: SearchServiceMocks
				}
			]
		});

		model = TestBed.inject(SearchModel);
		searchService = TestBed.inject(SearchService);
	});

	it('should be created', () => {
		expect(model)
			.toBeTruthy();
	});

	describe('method: executeSearch', () => {
		const searchValue = 'mock';
		const emptySearchValue = '';

		beforeEach(() => {
			model.loadItems = function() {
			};
		});

		it('should do nothing if search value is empty', () => {
			const spyReset = spyOn<any>(model, '_resetSearchValues');
			const spyLoadItems = spyOn(model, 'loadItems');
			const loadingValue = model['_isLoadingSubject'].getValue();
			const lastSearchValue = model['_lastSearchValue'];

			model.executeSearch(emptySearchValue);

			expect(spyReset)
				.not
				.toHaveBeenCalled();
			expect(spyLoadItems)
				.not
				.toHaveBeenCalled();
			expect(model['_isLoadingSubject'].getValue())
				.toBe(loadingValue);
			expect(model['_lastSearchValue'])
				.toBe(lastSearchValue);
		});

		it('should set loading', () => {
			model.executeSearch(searchValue);

			const loadingValue = model['_isLoadingSubject'].getValue();

			expect(loadingValue)
				.toBeTruthy();
		});

		it('should call reset last search values method', () => {
			const spyReset = spyOn<any>(model, '_resetSearchValues');

			model.executeSearch(searchValue);

			expect(spyReset)
				.toHaveBeenCalled();
		});

		it('should call load items method', () => {
			const spyLoadItems = spyOn(model, 'loadItems');

			model.executeSearch(searchValue);

			expect(spyLoadItems)
				.toHaveBeenCalled();
		});

		it('should update last search value', () => {
			model.executeSearch(searchValue);

			const lastSearchValue = model['_lastSearchValue'];

			expect(lastSearchValue)
				.toBe(searchValue);
		});
	});

	describe('method: searchNews', () => {
		beforeEach(() => {
			model['_lastSearchValue'] = 'mock';
			model.loadNewsItems = function() {
			};
		});

		it('should not execute news search with empty last value', () => {
			const spyReset = spyOn<any>(model, '_resetSearchValues');
			const spyLoadNewsItems = spyOn(model, 'loadNewsItems');
			const loadingValue = model['_isLoadingSubject'].getValue();

			model['_lastSearchValue'] = '';
			model.searchNews();

			expect(spyReset)
				.not
				.toHaveBeenCalled();
			expect(spyLoadNewsItems)
				.not
				.toHaveBeenCalled();
			expect(model['_isLoadingSubject'].getValue())
				.toBe(loadingValue);
		});

		it('should set loading', () => {
			model.searchNews();

			const loadingValue = model['_isLoadingSubject'].getValue();

			expect(loadingValue)
				.toBeTruthy();
		});

		it('should call reset last search values method', () => {
			const spyReset = spyOn<any>(model, '_resetSearchValues');

			model.searchNews();

			expect(spyReset)
				.toHaveBeenCalled();
		});

		it('should call load news items method', () => {
			const spyLoadNewsItems = spyOn(model, 'loadNewsItems');

			model.searchNews();

			expect(spyLoadNewsItems)
				.toHaveBeenCalled();
		});
	});

	describe('method: loadItems', () => {
		const searchItemsMock = SEARCH_ITEMS;

		it('should execute load items with correct params', () => {
			const spyLoad = spyOn(searchService, 'search')
				.and
				.returnValue(of(searchItemsMock));
			const lastValueMock = 'mock';
			const pageItemsMock = 10;

			model['_lastSearchValue'] = lastValueMock;
			model['_pageItems'] = pageItemsMock;

			model.loadItems();

			expect(spyLoad)
				.toHaveBeenCalledWith(lastValueMock, pageItemsMock);
		});

		it('should call update pagination method', () => {
			const spyNextPagination = spyOn<any>(model, '_setNextItemsPagination');

			model.loadItems();

			expect(spyNextPagination)
				.toHaveBeenCalled();
		});
	});

	describe('method: loadNewsItems', () => {
		const searchNewsMock = SEARCH_NEWS_ITEMS;

		it('should execute load news items with correct params', () => {
			const spyLoad = spyOn(searchService, 'searchNews')
				.and
				.returnValue(of(searchNewsMock));
			const lastValueMock = 'mock';
			const pageItemsMock = 10;

			model['_lastSearchValue'] = lastValueMock;
			model['_pageItems'] = pageItemsMock;

			model.loadNewsItems();

			expect(spyLoad)
				.toHaveBeenCalledWith(lastValueMock, pageItemsMock);
		});

		it('should call update pagination method', () => {
			const spyNextPagination = spyOn<any>(model, '_setNextItemsPagination');

			model.loadNewsItems();

			expect(spyNextPagination)
				.toHaveBeenCalled();
		});
	});

	describe('method: _updateSearchResultValues', () => {
		const searchItems = SEARCH_ITEMS;

		it('should update search items correctly', () => {
			model['_updateSearchResultValues'](searchItems);

			expect(model['_organicItemsSubject'].getValue())
				.toBe(searchItems);
		});
	});

	describe('method: _updateNewsResultValues', () => {
		const searchNewsItems = SEARCH_NEWS_ITEMS;

		it('should update search news items correctly', () => {
			model['_updateNewsResultValues'](searchNewsItems);

			expect(model['_newsItemsSubject'].getValue())
				.toBe(searchNewsItems);
		});
	});

	describe('method: _setNextItemsPagination', () => {
		const startPageItems = 0;
		const resultPageItems = 10;

		it('should update pagination correctly', () => {
			model['_pageItems'] = startPageItems;

			model['_setNextItemsPagination']();

			expect(model['_pageItems'])
				.toBe(resultPageItems);
		});
	});

	describe('method: _resetPagination', () => {
		const startPageItems = 20;
		const resultPageItems = 0;

		it('should reset pagination correctly', () => {
			model['_pageItems'] = startPageItems;

			model['_resetPagination']();

			expect(model['_pageItems'])
				.toBe(resultPageItems);
		});
	});

	describe('method: _resetSearchValues', () => {
		it('should call all reset methods with correct params', () => {
			const spyUpdateSearch = spyOn<any>(model, '_updateSearchResultValues');
			const spyUpdateNews = spyOn<any>(model, '_updateNewsResultValues');
			const spyResetPagination = spyOn<any>(model, '_resetPagination');

			model['_resetSearchValues']();

			expect(spyUpdateSearch)
				.toHaveBeenCalledWith([]);
			expect(spyUpdateNews)
				.toHaveBeenCalledWith([]);
			expect(spyResetPagination)
				.toHaveBeenCalled();
		});
	});
});
