import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {DropdownDirective} from './directives/dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownDirective
  ]
})
export class SharedModule {
}
