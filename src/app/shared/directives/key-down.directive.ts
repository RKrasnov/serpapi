import { Directive, ElementRef, Input, Output } from '@angular/core';
import { filter, fromEvent, Observable, of, takeUntil } from 'rxjs';
import { BaseComponent } from '../../base.component';

@Directive({
	selector: '[keyDown]'
})
export class KeyDownDirective extends BaseComponent {
	@Input() public keys: string[] = [];

	@Output() public keyDown: Observable<KeyboardEvent> = of({} as KeyboardEvent);

	constructor(private _elementRef: ElementRef<HTMLElement>) {
		super();
		this._addKeyDownListener();
	}

	private get element(): HTMLElement {
		return this._elementRef.nativeElement;
	}

	private _addKeyDownListener(): void {
		this.keyDown = fromEvent<KeyboardEvent>(this.element, 'keydown')
			.pipe(
				filter((event: KeyboardEvent) => this.keys.includes(event.key)),
				takeUntil(this.componentDestroyed$)
			);
	}
}
