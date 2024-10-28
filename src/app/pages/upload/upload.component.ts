import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
})
export class UploadComponent {
  uploadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(160)]],
      categories: ['', Validators.required],
      file: [null, [Validators.required, this.fileValidator]],
    });
  }

  fileValidator(control: AbstractControl) {
    const file = control.value;
    if (file && file.size > 104857600) return { fileSize: true };
    return null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadForm.patchValue({ file: file });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      // Process upload
      console.log(this.uploadForm.value);
    }
  }
}
