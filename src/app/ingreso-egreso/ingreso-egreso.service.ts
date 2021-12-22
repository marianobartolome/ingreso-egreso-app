import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription:Subscription=new Subscription();
  ingresoEgresoItemsSubscription:Subscription=new Subscription();

  constructor( private afDB:AngularFirestore,
                public authService:AuthService,
                private store:Store<AppState>) { }


  initIngresoEgresoListener(){

    this.ingresoEgresoListenerSubscription=this.store.select('auth')
      .pipe(
        filter(auth=>auth.user!=null)
      )
      .subscribe(auth=>{
        console.log(auth.user.uid);
        this.ingresoEgresoItems(auth.user.uid)
      });
  }

  private ingresoEgresoItems(uid:string){
    this.ingresoEgresoItemsSubscription=this.afDB.collection(`${uid}/ingresos-egresos/items`)
      //.valueChanges()
      .snapshotChanges()
      .pipe(
        map(docData=>{
          return docData.map((doc:any)=>{
            return {
              uid:doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe( (coleccion:any[])=>{
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancelarSubscriptions(){
    
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );
    console.log('cancela subscripcion');
  }

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){

    const user=this.authService.getUsuario();

  
    
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
      
  }

  borrarIngresoEgreso(uid:any){
    const user=this.authService.getUsuario();


    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }
}
