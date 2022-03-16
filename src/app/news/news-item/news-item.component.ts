import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NewsResult } from "../../search/search.interface";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItemComponent {
  //@ts-ignore
  @Input() public newsItem: NewsResult;
}
