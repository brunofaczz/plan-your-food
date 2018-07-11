import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  @Output() addIngredient = new EventEmitter<Ingredient>();

  onAdd() {
    this.addIngredient.emit(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }
}
