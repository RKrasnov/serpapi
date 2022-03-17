import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { SearchModel } from '../search/search.model';
import { SearchModelMocks } from '../mocks/search-model-mocks';

describe('NewsComponent', () => {
	let component: NewsComponent;
	let fixture: ComponentFixture<NewsComponent>;
	let searchModel: SearchModel;

	beforeEach(async() => {
		await TestBed.configureTestingModule({
			declarations: [ NewsComponent ],
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
		fixture = TestBed.createComponent(NewsComponent);
		component = fixture.componentInstance;
		searchModel = TestBed.inject(SearchModel);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component)
			.toBeTruthy();
	});

	describe('news get by initialization', () => {
		it('should execute call news search', () => {
			const searchValue = 'mock';
			const spySearch = spyOn(searchModel, 'searchNews');

			searchModel['_lastSearchValue'] = searchValue;
			component.ngOnInit();

			expect(spySearch)
				.toHaveBeenCalled();
		});
	});
});
