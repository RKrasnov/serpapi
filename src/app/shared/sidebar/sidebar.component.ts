import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SidebarItems } from './sidebar.interface';
import { MAIN_SIDEBAR_ITEMS } from './sidebar.const';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
	@Input() public sidebarItems: SidebarItems = MAIN_SIDEBAR_ITEMS;
}
