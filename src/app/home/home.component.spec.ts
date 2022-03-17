import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchModel } from '../search/search.model';
import { SearchModelMocks } from '../mocks/search-model-mocks';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let searchModel: SearchModel;

	beforeEach(async() => {
		await TestBed.configureTestingModule({
			declarations: [ HomeComponent ],
			providers: [
				{
					provide: SearchModel,
					useClass: SearchModelMocks
				}
			]
		})
								 .compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		searchModel = TestBed.inject(SearchModel);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component)
			.toBeTruthy();
	});

	describe('restore previous search functionality', () => {
		it('should execute search with last value', () => {
			const lastValueMock = 'value';
			const spySearch = spyOn(searchModel, 'executeSearch');

			searchModel['_lastSearchValue'] = lastValueMock;
			component.ngOnInit();

			expect(spySearch)
				.toHaveBeenCalledWith(lastValueMock);
		});

		it('should not execute search without value', () => {
			const lastValueMock = '';
			const spySearch = spyOn(searchModel, 'executeSearch');

			searchModel['_lastSearchValue'] = lastValueMock;
			component.ngOnInit();

			expect(spySearch)
				.not
				.toHaveBeenCalled();
		});

		it('should set last search value to control', () => {
			const lastValueMock = 'value';

			searchModel['_lastSearchValue'] = lastValueMock;
			component.ngOnInit();

			expect(component.searchControl.value)
				.toBe(lastValueMock);
		});
	});

	describe('method: search', () => {
		it('should perform search with value', () => {
			const spySearch = spyOn(searchModel, 'executeSearch');
			const controlValue = 'value';

			component.searchControl.setValue(controlValue);
			component.search();

			expect(spySearch)
				.toHaveBeenCalledWith(controlValue);
		});

		it('should not perform search without value', () => {
			const spySearch = spyOn(searchModel, 'executeSearch');
			const controlValue = '';

			component.searchControl.setValue(controlValue);
			component.search();

			expect(spySearch)
				.not
				.toHaveBeenCalled();
		});
	});
});
