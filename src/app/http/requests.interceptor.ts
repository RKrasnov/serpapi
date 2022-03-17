import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
	private _url: string = environment.API_URL;
	private _apiKey: string = environment.API_KEY;
	private _paramsStr: string = `&engine=google&api_key=${ this._apiKey }`;

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const extendedRequest: HttpRequest<unknown> = request.clone({
			url: this._getCorrectUrl(request.url)
		});

		return next.handle(extendedRequest);
	}

	private _getCorrectUrl(requestUrl: string): string {
		return !requestUrl.indexOf('assets')
					 ? requestUrl
					 : this._url + requestUrl + this._paramsStr;
	}
}
