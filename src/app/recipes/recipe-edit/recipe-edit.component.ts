import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const ingredients = [];
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipe.ingredients.forEach(ingredient => {
        ingredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount,
            [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.toRecipeList();
  }

  toRecipeList() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('',
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

}
