import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/uid.accions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma!: FormGroup;
  tipo='ingreso';
  loadingSubs:Subscription=new Subscription();
  cargando!:boolean;

  constructor( public ingersoEgresoService:IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    
    this.loadingSubs=this.store.select('ui')
                      .subscribe(ui=> this.cargando=ui.isLoading);

    this.forma =new FormGroup({
      'descripcion':new FormControl('', Validators.required),
      'monto':new FormControl(0, Validators.min(1))
    });
  }

  ngOnDestroy(): void {
      this.loadingSubs.unsubscribe();
  }
  crearIngresoEgreso(){
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({...this.forma.value,tipo:this.tipo})

    //console.log(ingresoEgreso);
    this.ingersoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(()=>{
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Creado',ingresoEgreso.descripcion,'success');
        this.forma.reset({ monto:0 });
    });

    

  }
}
