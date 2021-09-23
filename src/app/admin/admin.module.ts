import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatTableModule } from "@angular/material/table";
import { PhotoUrlPipe } from './photo-url.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    PhotoUrlPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
  ]
})
export class AdminModule { }
