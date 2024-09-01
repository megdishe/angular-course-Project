import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Subscription} from "rxjs";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
  }

  protected readonly onsubmit = onsubmit;

  onSubmit() {
    this.isLoading = true;
    let email = this.authForm.value.email;
    let password = this.authForm.value.password;
    let authObservable = this.isLoginMode ? this.authService.login(email, password)
      : this.authService.signUp(email, password);
    authObservable
      .subscribe(responseDate => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      }, error => {
        this.error = error;
        this.showErrorAlert(this.error);
        this.isLoading = false;
      });
    this.authForm.reset();
  }

  private showErrorAlert(error: string) {
    // let alertComponentComponentFactory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();
    // let alertComponentComponentRef = hostViewContainerRef.createComponent(alertComponentComponentFactory);
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const alertComponentComponentRef = viewContainerRef.createComponent(AlertComponent);
    alertComponentComponentRef.setInput("message", error);
    this.subscription = alertComponentComponentRef.instance.close.subscribe(()=>{
      this.subscription.unsubscribe();
      viewContainerRef.clear();
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
