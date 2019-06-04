import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, routableComponents } from './admin-routing.module';

import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LevelService } from './services/level.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BatchService } from './services/batch.service';
import { AdminauthguardGuard } from 'src/app/guards/adminauthguard.guard';


@NgModule({
  declarations: [
    routableComponents,
    NavbarComponent
  ],
imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [
    LevelService,
    BatchService,
    AdminauthguardGuard
  ]
})
export class AdminModule { }