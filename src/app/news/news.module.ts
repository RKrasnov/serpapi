import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { RouterModule, Routes } from '@angular/router';
import { NewsItemComponent } from './news-item/news-item.component';
import { LoaderModule } from '../shared/ui-kit/loader/loader.module';
import { DirectivesModule } from '../shared/directives/directives.module';

const ROUTES: Routes = [
	{
		path: '',
		component: NewsComponent
	}
];

@NgModule({
	declarations: [
		NewsComponent,
		NewsItemComponent
	],
	imports: [
		RouterModule.forChild(ROUTES),
		CommonModule,
		LoaderModule,
		DirectivesModule
	]
})
export class NewsModule {
}
