import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { ApplicantRoutingModule, routableComponents } from './applicant-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActivityrecordsComponent } from './components/activityrecords/activityrecords.component';
import { ActivityrecordsdetailComponent } from './components/activityrecords/activityrecordsdetail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApplicantauthGuard } from 'src/app/guards/applicantauth.guard';
@NgModule({
  declarations: [
    routableComponents,
    NavbarComponent,
    ActivityrecordsComponent,
    ActivityrecordsdetailComponent
  ],
  imports: [
    CommonModule,
    ApplicantRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  providers:[
    ApplicantauthGuard
  ]
})
export class ApplicantModule { }
