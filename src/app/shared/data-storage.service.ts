import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {RecipeService} from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes(recipes: Recipe[]) {
    this.http.put("https://ng-comple-guide-cf662-default-rtdb.firebaseio.com/recipes.json", recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      "https://ng-comple-guide-cf662-default-rtdb.firebaseio.com/recipes.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
