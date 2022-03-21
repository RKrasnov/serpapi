export interface SearchResponse {
	organic_results: OrganicResult[];
	search_information: SearchInformation;
	error?: string;
}

export interface SearchInformation {
	total_results: number;
}

export interface OrganicResult {
	position: number;
	snippet: string;
	title: string;
	displayed_link: string;
	link: string;
	about_page_link: string;
	cached_page_link: string;
}

export interface NewsSearchResponse {
	news_results: NewsResult[];
	search_information: SearchInformation;
	error?: string;
}

export interface NewsResult {
	date: string;
	link: string;
	position: number;
	snippet: string;
	source: string;
	thumbnail: string;
	title: string;
}
