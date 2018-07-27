import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  shoppingListForm: FormGroup;
  editMode = false;
  subscription: Subscription;
  editedItemId: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.shoppingListForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)])
    });

    this.shoppingListService.startedEditing
      .subscribe((id: number) => {
        this.editMode = true;
        this.editedItemId = id;
        const ingredient = this.shoppingListService.getIngredient(id);
        this.shoppingListForm.patchValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAdd() {
    const ingredient = new Ingredient(this.shoppingListForm.get('name').value, this.shoppingListForm.get('amount').value);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.editedItemId = null;
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemId);
    this.onClear();
  }
}
