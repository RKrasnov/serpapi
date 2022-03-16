import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyDownDirective } from './key-down.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';



@NgModule({
  declarations: [
    KeyDownDirective,
    InfiniteScrollDirective
  ],
    exports: [
        KeyDownDirective,
        InfiniteScrollDirective
    ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
