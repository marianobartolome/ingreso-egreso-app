

import { AppState } from '../app.reducer';
import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface IngresoEgresoAppState extends AppState{
    ingresoEgreso:IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items:[]
}

export function ingresoEgresoReducer(state=estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState{

    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items:[
                    ...action.items.map(item=>{
                        return{
                            ...item
                        };
                    })
                ]
            };

        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items:[]
            };

        default:
            return state;
    }
}