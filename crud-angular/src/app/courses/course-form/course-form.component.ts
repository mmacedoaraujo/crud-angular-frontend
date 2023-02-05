import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: CoursesService, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }
  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => console.log(result), error => { this.onError() });
  }

  onCancel() {
    console.log('alou')
  }

  private onError() {
    this.snackBar.open("Error while trying to save a new course", "close", { duration: 3000 })
  }

}
