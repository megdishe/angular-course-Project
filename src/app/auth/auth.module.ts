import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    SharedModule,
    FormsModule,
    CommonModule
  ]
})
export class AuthModule {
}
