import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './pages/register/register.page';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
