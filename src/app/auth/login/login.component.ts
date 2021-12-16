import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando!:boolean;
  subscription!:Subscription;

  constructor(public authService:AuthService,
              private store:Store<AppState>) { }

  ngOnInit(): void {

    this.subscription = this.store.select('ui')
      .subscribe(ui=>this.cargando=ui.isLoading);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(data:any){
    //console.log(data)
    
    this.authService.login(data.email,data.password);
  }

}
