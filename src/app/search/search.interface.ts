export interface SearchResponse {
  organic_results: OrganicResult[];
}

export interface OrganicResult {
  position: 1
  snippet: string;
  title: string;
  displayed_link: string;
  link: string;
  about_page_link: string;
  cached_page_link: string;
}

export interface NewsSearchResponse {
  news_results: NewsResult[];
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
