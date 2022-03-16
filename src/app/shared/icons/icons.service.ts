import { Injectable } from '@angular/core';
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { ICONS } from "./iconst.const";

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  constructor(private _library: FaIconLibrary) {
    this._registerIcons();
  }

  private _registerIcons(): void {
    this._library.addIcons(...ICONS);
  }
}
