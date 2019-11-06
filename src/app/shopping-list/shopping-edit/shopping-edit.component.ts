import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('newIngredientName', {static: true}) newIngredientName: ElementRef;
  @ViewChild('newIngredientAmount', {static: true}) newIngredientAmount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();


  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredientName = this.newIngredientName.nativeElement.value;
    const ingredientAmount = this.newIngredientAmount.nativeElement.value;
    
    const newIngredient = new Ingredient(
      ingredientName,
      ingredientAmount
    )
    this.ingredientAdded.emit(newIngredient);
  }

}
