import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeItemComponent
  ],
  // exports: [
  //   RecipesComponent,
  //   RecipeDetailComponent,
  //   RecipeStartComponent,
  //   RecipeListComponent,
  //   RecipeEditComponent,
  //   RecipeItemComponent
  //  ],
  imports: [
    RecipesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RecipesModule {
}
