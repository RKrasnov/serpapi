import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrganicResult } from "../../../search/search.interface";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  //@ts-ignore
  @Input() public searchItem: OrganicResult;
}
