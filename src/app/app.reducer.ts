
import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/uid.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';



export interface AppState{
    ui: fromUI.State;
    auth:fromAuth.AuthState;
    ingresoEgreso:fromIngresoEgreso.IngresoEgresoState
}

export const appReducers:ActionReducerMap<any,any>= {
    ui: fromUI.uiReducer,
    auth:fromAuth.authReducer,
    ingresoEgreso:fromIngresoEgreso.ingresoEgresoReducer
};