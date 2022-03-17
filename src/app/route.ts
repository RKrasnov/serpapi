import { Routes } from '@angular/router';
import { BASE_PATH } from './app.const';

export const ROUTES: Routes = [
	{
		path: BASE_PATH.HOME,
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
	},
	{
		path: BASE_PATH.NEWS,
		loadChildren: () => import('./news/news.module').then((m) => m.NewsModule)
	}
];
