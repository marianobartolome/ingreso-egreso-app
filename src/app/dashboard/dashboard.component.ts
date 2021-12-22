import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor( public ingresoEgresoService:IngresoEgresoService,
              public authService: AuthService) { }

  ngOnInit(): void {
    
    this.ingresoEgresoService.initIngresoEgresoListener();
    
  }

}
