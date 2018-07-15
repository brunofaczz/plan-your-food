import {Component, ElementRef, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onAdd() {
    this.shoppingListService.addIngredient(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }
}
