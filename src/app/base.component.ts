import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
	private _onDestroySubject: Subject<void> = new Subject();
	public componentDestroyed$: Observable<void> = this._onDestroySubject.asObservable();

	public ngOnDestroy(): void {
		this._onDestroySubject.next();
		this._onDestroySubject.complete();
	}
}
