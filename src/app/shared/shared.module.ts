import {NgModule} from "@angular/core";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {CommonModule} from "@angular/common";
import {AlertComponent} from "./alert/alert.component";

@NgModule({
  declarations: [
    PlaceholderDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [CommonModule],
  exports: [
    PlaceholderDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule {
}
