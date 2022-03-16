import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchModel } from "../search/search.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {
  constructor(
    public searchModel: SearchModel,
  ) { }

  public ngOnInit(): void {
    this.searchModel.searchNews();
  }
}
