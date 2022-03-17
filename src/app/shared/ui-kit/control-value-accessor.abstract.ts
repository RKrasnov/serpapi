import { ControlValueAccessor } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { ChangeDetectorRef } from '@angular/core';

export abstract class ControlValueAccessorAbstract extends BaseComponent implements ControlValueAccessor {
	public changeFn = Function();
	public touchFn = Function();

	public disabled: boolean = false;

	protected constructor(protected cd: ChangeDetectorRef) {
		super();
	}

	public registerOnChange(fn: any): void {
		this.changeFn = fn;
	}

	public registerOnTouched(fn: any): void {
		this.touchFn = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
		this.cd.markForCheck();
	}

	public abstract writeValue(obj: any): void;
}
