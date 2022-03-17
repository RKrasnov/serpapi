import { NewsResult, OrganicResult } from '../search/search.interface';

export const SEARCH_ITEMS: OrganicResult[] = [
	{
		position: 1,
		snippet: 'string',
		title: 'string',
		displayed_link: 'string',
		link: 'string',
		about_page_link: 'string',
		cached_page_link: 'string'
	},
	{
		position: 2,
		snippet: 'string',
		title: 'string',
		displayed_link: 'string',
		link: 'string',
		about_page_link: 'string',
		cached_page_link: 'string'
	}
];

export const SEARCH_NEWS_ITEMS: NewsResult[] = [
	{
		date: 'string',
		link: 'string',
		position: 1,
		snippet: 'string',
		source: 'string',
		thumbnail: 'string',
		title: 'string'
	},
	{
		date: 'string',
		link: 'string',
		position: 2,
		snippet: 'string',
		source: 'string',
		thumbnail: 'string',
		title: 'string'
	}
];
