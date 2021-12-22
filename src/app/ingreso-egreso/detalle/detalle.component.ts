import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoAppState } from '../ingreso-egreso.reducer';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {

  items!:IngresoEgreso[];
  subscription:Subscription=new Subscription();

  constructor(private store:Store<IngresoEgresoAppState>,
              public ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.subscription=this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso=>{
       // console.log(ingresoEgreso.items);
        this.items=ingresoEgreso.items;
      });
    
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  borrarItem(item:IngresoEgreso){
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then(()=>{
      Swal.fire('Eliminado',item.descripcion,'success');
    })
  }

}
