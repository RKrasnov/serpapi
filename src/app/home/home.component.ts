import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { SearchModel } from "../search/search.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public searchControl: FormControl = new FormControl('');

  constructor(public searchModel: SearchModel) {}

  public ngOnInit(): void {
    const searchValue: string = this.searchModel.lastSearchValue;

    if (!searchValue) {
      return;
    }

    this.searchControl.setValue(searchValue, { emitEvent: false });
    this.search();
  }

  public search(): void {
    const searchValue: string = this.searchControl.value;

    if (!searchValue) {
      return;
    }

    this.searchModel.executeSearch(searchValue);
  }
}
