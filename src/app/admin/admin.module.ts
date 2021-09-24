import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatTableModule } from "@angular/material/table";
import { PhotoUrlPipe } from './photo-url.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './+admin/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './+admin/admin.effects';

@NgModule({
  declarations: [
    AdminComponent,
    PhotoUrlPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.reducer),
    EffectsModule.forFeature([AdminEffects]),
  ]
})
export class AdminModule { }
