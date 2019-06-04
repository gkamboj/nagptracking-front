import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LevelsComponent } from './components/level/levels.component';
import { EditlevelsComponent } from './components/level/editlevels.component';
import { LeveldetailsComponent } from './components/level/leveldetails.component';
import { BatchesComponent } from './components/batch/batches.component';
import { BatchesdetailsComponent } from './components/batch/batchesdetails.component';
import { BatcheditComponent } from './components/batch/batchedit.component';
import { ActivitiesComponent } from './components/activity/activities.component';
import { ActivitydetailsComponent } from './components/activity/activitydetails.component';
import { ActivityeditComponent } from './components/activity/activityedit.component';
import { ApplicantdetailsComponent } from './components/applicant/applicantdetails.component';
import { EditapplicantComponent } from './components/applicant/editapplicant.component';
import { ApplicantsComponent } from './components/applicant/applicants.component';
import { AdminauthguardGuard } from 'src/app/guards/adminauthguard.guard';
import { ApplicantrecordComponent } from './components/applicant/applicantrecord.component';
import { RecordsdetailsComponent } from './components/applicant/recordsdetails.component';



const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate:[AdminauthguardGuard],children: [
      { path: '', pathMatch: "full", redirectTo: 'levels' },
      { path: 'levels', component: LevelsComponent },
      { path: 'levels/:id', component: LeveldetailsComponent },
      { path: 'levels/:id/edit', component: EditlevelsComponent },
      { path: 'batches', component: BatchesComponent },
      { path: 'batches/:id', component: BatchesdetailsComponent },
      { path: 'batches/:id/edit', component: BatcheditComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'activities/:id', component: ActivitydetailsComponent },
      { path: 'activities/:id/edit', component: ActivityeditComponent },
      { path: 'applicants', component: ApplicantsComponent },
      { path: 'applicants/:id', component: ApplicantdetailsComponent },
      { path: 'applicants/:id/edit', component: EditapplicantComponent },
      { path: 'applicants/:id/record', component: ApplicantrecordComponent },
      { path:'applicants/:id/record/:recordId', component:RecordsdetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
export const routableComponents = [
  AdminComponent,
  LevelsComponent,
  LeveldetailsComponent,
  EditlevelsComponent,
  BatchesComponent,
  BatchesdetailsComponent,
  BatcheditComponent,
  ActivitiesComponent,
  ActivitydetailsComponent,
  ActivityeditComponent,
  ApplicantsComponent,
  EditapplicantComponent,
  ApplicantdetailsComponent,
  ApplicantrecordComponent,
  RecordsdetailsComponent
]