import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoService } from '../../../services/video.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatProgressSpinnerModule],
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  readonly maxFileSize = 100 * 1024 * 1024;
  errors: { [key: string]: string } = {};
  loading = false;
  constructor(private fb: FormBuilder, private videoService: VideoService, private router: Router ) {
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
    this.errors['file'] = ''; // Reset file error on each file change
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > this.maxFileSize) {
        this.errors['file'] = "File size exceeds 100 MB limit."; // Set file-specific error
        this.uploadForm.get('file')?.setValue(null); // Clear the file from form control
        this.selectedFile = null; // Clear the file reference
      } else {
        this.selectedFile = file;
        this.uploadForm.patchValue({ file: this.selectedFile });
      }
    }
  }
  onSubmit() {
    this.errors = {}; // Reset all errors on submit

    if (!this.selectedFile) {
      this.errors['file'] = "Please select a file.";
    }

    if (this.uploadForm.get('title')?.invalid) {
      this.errors['title'] = "Title is required.";
    }

    if (this.uploadForm.get('description')?.invalid) {
      this.errors['description'] = "Description is required and cannot exceed 160 characters.";
    }

    if (this.uploadForm.get('categories')?.invalid) {
      this.errors['categories'] = "Please enter at least one category.";
    }

    if (Object.keys(this.errors).length === 0) {
      this.loading = true;
      const formData = new FormData();
      formData.append('title', this.uploadForm.get('title')?.value);
      formData.append('description', this.uploadForm.get('description')?.value);
      formData.append('categories', this.uploadForm.get('categories')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.videoService.uploadVideo(formData).subscribe({
        next: (result: any) => {
          this.loading = false;
          this.router.navigate([`/streaming/${result.videoId}`]); 
        },
        error: err => {
          console.error("Upload failed:", err);
          this.loading = false;
        }
      });
    } else {
      console.error("Form submission blocked due to errors:", this.errors);
    }
  }
}
