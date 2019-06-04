import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantComponent } from './applicant.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/profile/editprofile.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityrecordsComponent } from './components/activityrecords/activityrecords.component';
import { ActivityrecordsdetailComponent } from './components/activityrecords/activityrecordsdetail.component';
import { ApplicantauthGuard } from 'src/app/guards/applicantauth.guard';
import { ActivityrecordseditComponent } from './components/activityrecords/activityrecordsedit.component';

const routes: Routes = [
  {
    path: 'applicant', component: ApplicantComponent,canActivate:[ApplicantauthGuard], children: [
      { path: '', pathMatch: "full", redirectTo: 'activities' },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: EditprofileComponent },
      { path: 'records', component: ActivityrecordsComponent },
      { path: 'records/:id', component: ActivityrecordsdetailComponent },
      { path:'records/:id/edit', component: ActivityrecordseditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantRoutingModule { }
export const routableComponents = [
  ApplicantComponent,
  ProfileComponent,
  EditprofileComponent,
  ActivitiesComponent,
  ActivityrecordseditComponent
]