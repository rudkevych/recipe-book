import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {

}
