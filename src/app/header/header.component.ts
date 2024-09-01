import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isAuthenticated = false;

  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.userSubject
      .subscribe(user => {
          this.isAuthenticated = !!user;
        }
      )
  }

  onSaveRecipes() {
    this.dataStorage.storeRecipes(this.recipeService.getRecipes());
  }

  onFetchRecipes() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated= false;
  }
}
