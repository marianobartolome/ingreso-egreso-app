
import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/uid.reducer';

import * as fromAuth from './auth/auth.reducer';

export interface AppState{
    ui: fromUI.State;
    auth:fromAuth.AuthState;
}

export const appReducers:ActionReducerMap<any,any>= {
    ui: fromUI.uiReducer,
    auth:fromAuth.authReducer
};