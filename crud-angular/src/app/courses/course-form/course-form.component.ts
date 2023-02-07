import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, UntypedFormGroup, NonNullableFormBuilder } from '@angular/forms';
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

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });;

  constructor(private formBuilder: NonNullableFormBuilder, private service: CoursesService, private snackBar: MatSnackBar, private location: Location) {

  }
  ngOnInit(): void {

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
