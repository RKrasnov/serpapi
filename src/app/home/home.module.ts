import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { InputModule } from '../shared/ui-kit/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '../shared/directives/directives.module';
import { LoaderModule } from '../shared/ui-kit/loader/loader.module';
import { SearchItemComponent } from './search-item/search-item.component';

const ROUTES: Routes = [
	{
		path: '',
		component: HomeComponent
	}
];

@NgModule({
	declarations: [
		HomeComponent,
		SearchItemComponent
	],
	imports: [
		RouterModule.forChild(ROUTES),
		CommonModule,
		InputModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		DirectivesModule,
		LoaderModule
	]
})
export class HomeModule {
}
