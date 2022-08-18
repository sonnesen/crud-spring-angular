import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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

  constructor(private formBuilder: UntypedFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.form = new UntypedFormGroup({ name: new UntypedFormControl(null),
                                category: new UntypedFormControl(null)
    });
  }

  ngOnInit(): void {
    // Nothing to do here for now
  }

  onSubmit(): void {
    this.service.save(this.form.value)
      .subscribe(() => this.onSuccess(),
                 () => this.onError());
  }

  onCancel(): void {
    this.location.back();
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!.', '', { duration: 5000 });
    this.location.back();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }

}
