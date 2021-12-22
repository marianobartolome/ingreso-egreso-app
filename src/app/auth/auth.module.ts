import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; //necesario para usar ngif y ngfor en el html

import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {  RouterModule } from "@angular/router";



@NgModule({

    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})
export class AuthModule{}