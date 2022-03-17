import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	forwardRef,
	HostListener,
	Input,
	OnInit,
	ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ControlValueAccessorAbstract } from '../control-value-accessor.abstract';

@Component({
	selector: 'ui-input',
	templateUrl: './input.component.html',
	styleUrls: [ './input.component.scss' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends ControlValueAccessorAbstract implements OnInit {
	@ViewChild('inputElement') public input!: ElementRef<HTMLInputElement>;

	@Input() public placeholder: string = '';

	public inputControl: FormControl = this._fb.control('');

	constructor(
		private _fb: FormBuilder,
		private _cd: ChangeDetectorRef
	) {
		super(_cd);
	}

	public ngOnInit(): void {
		this._addInputChangeListener();
	}

	@HostListener('focus')
	public onFocus(): void {
		this.input.nativeElement.focus();
	}

	public writeValue(value: string): void {
		this.inputControl.setValue(value, { emitEvent: false });
		this._cd.markForCheck();
	}

	private _addInputChangeListener(): void {
		this.inputControl.valueChanges
				.pipe(takeUntil(this.componentDestroyed$))
				.subscribe(
					(value: string) => this.changeFn(value)
				);
	}
}
