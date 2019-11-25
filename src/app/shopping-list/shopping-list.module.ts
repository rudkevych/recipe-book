import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    ShoppingListRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShoppingListModule {

}
