import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';

export interface IIntersectionOptions {
	root: Element | null;
	rootMargin: string;
	thresholds: number[];
}

export const INFINITE_SCROLL_CLASS = 'infinite-scroll-class';

@Directive({
	selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnDestroy {
	@Output() public infiniteScrolled: EventEmitter<void> = new EventEmitter<void>();

	private _observer!: IntersectionObserver;
	private _anchor!: Element;
	private _elements: unknown[] = [];

	constructor(private _el: ElementRef, private _renderer: Renderer2) {
	}

	@Input()
	public set infiniteScrollElements(value: any[]) {
		if (value.length === this._elements.length) {
			return;
		}

		if (this._observer) {
			this._observer.disconnect();
		}

		this._addAnchor();
		this._addListener();
	}

	private _infiniteScrollOptions!: Partial<IIntersectionOptions>;

	public get infiniteScrollOptions(): Partial<IIntersectionOptions> {
		return this._infiniteScrollOptions || { root: this._rootOption };
	}

	@Input()
	public set infiniteScrollOptions(value: Partial<IIntersectionOptions>) {
		this._infiniteScrollOptions = {
			root: this._rootOption,
			rootMargin: '10px',
			thresholds: [ 0.5 ],
			...value
		};
	}

	private get _isScrollable(): boolean {
		const componentStyles = this._el.nativeElement.style;
		const overflowValues = [ 'scroll', 'auto' ];

		return componentStyles?.overflow === 'auto' || overflowValues.includes(componentStyles?.overflowY);
	}

	private get _rootOption(): Element | null {
		return this._isScrollable
					 ? ( this._el.nativeElement as Element )
					 : null;
	}

	public ngOnDestroy(): void {
		this._observer?.disconnect();
	}

	private _addAnchor(): void {
		const anchorEl: Element = this._renderer.createElement('div');

		this._renderer.addClass(anchorEl, INFINITE_SCROLL_CLASS);
		this._renderer.appendChild(this._el.nativeElement, anchorEl);

		this._anchor = anchorEl;
	}

	private _removeAnchor(): void {
		if (this._anchor) {
			this._renderer.removeChild(this._el.nativeElement, this._anchor);
		}
	}

	private _addListener(): void {
		this._observer = new IntersectionObserver(([ entry ]) => {
			if (!entry.isIntersecting) {
				return;
			}

			this._removeAnchor();
			this.infiniteScrolled.emit();
		}, this.infiniteScrollOptions);

		this._observer.observe(this._anchor);
	}
}

