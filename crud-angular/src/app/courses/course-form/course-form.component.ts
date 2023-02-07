import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private service: CoursesService, private snackBar: MatSnackBar, private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }
  ngOnInit(): void {
    this.form.get('name')
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
      this.onCancel()
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open("Course created successfully!", "close", { duration: 3000 })
  }

  private onError() {
    this.snackBar.open("Error while trying to save a new course", "close", { duration: 3000 })
  }

}
