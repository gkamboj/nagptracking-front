import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editlevels',
  templateUrl: './editlevels.component.html',
  styleUrls: ['./editlevels.component.css']
})
export class EditlevelsComponent implements OnInit {

  dataFromService: any;
  action: string = ' ';
  level: any;
  id: number;
  isAdd: boolean;
  editForm: FormGroup;
  constructor(
    private levelService: LevelService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit() {
    this.id = +this.router.snapshot.paramMap.get('id');
    this.editForm = this.fb.group({
      'number': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'qualificationPoints': ['', [Validators.required]]
    });
    if (this.id === 0) {
      this.isAdd = true;
      this.action = 'Add';
    } else {
      this.isAdd = false;
      this.action = 'Edit';
      this.levelService.getLevelByid(this.id)
        .subscribe(data => {
          this.dataFromService = data;
          this.level = this.dataFromService.data;
          this.editForm = this.fb.group({
            'levelId': [this.level.levelId],
            'number': [this.level.number, [Validators.required]],
            'name': [this.level.name, [Validators.required]],
            'description': [this.level.description, [Validators.required]],
            'qualificationPoints': [this.level.qualificationPoints, [Validators.required]]
          });
        })
    }

  }

  onSubmit() {
    var bodyToSend;
    if (this.id === 0) {
      bodyToSend = {
        'number': this.editForm.value.number,
        'name': this.editForm.value.name,
        'description': this.editForm.value.description,
        'qualificationPoints': this.editForm.value.qualificationPoints
      }
      this.levelService.addLevel(bodyToSend)
        .subscribe(data => {
          this.snackBar.open("Successfully Added", "X", {
            duration: 3500
          })
          this.route.navigateByUrl("/admin/levels");
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    } else {
      bodyToSend = {
        'levelId': this.level.levelId,
        'number': this.level.number,
        'name': this.level.name,
        'description': this.editForm.value.description,
        'qualificationPoints': this.editForm.value.qualificationPoints
      }
      this.levelService.editLevel(this.id, bodyToSend)
        .subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
          this.snackBar.open("successfully edited", "close", {
            duration: 3500
          });
          this.route.navigateByUrl("/admin/levels/" + this.id);
        },
          err => {
            this.snackBar.open(err.error.data, "Cancel", {
              duration: 3500,
              panelClass: "btn-danger"
            });
          });
    }
  }

}
