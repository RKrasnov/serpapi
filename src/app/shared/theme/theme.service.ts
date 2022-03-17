import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { COLORS } from './theme.const';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	constructor(
		@Inject(DOCUMENT) private _document: Document
	) {
		this._setColors(COLORS);
	}

	private _setColors(colors: Record<string, string>): void {
		const root: HTMLElement = this._document.documentElement;

		Object.entries(colors)
					.forEach(
						([ key, color ]) => root.style.setProperty(key, color)
					);
	}
}
