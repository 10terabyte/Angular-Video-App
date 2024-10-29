import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadComponent } from './upload.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VideoService } from '../../../services/video.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockVideoService {
  uploadVideo(formData: FormData) {
    return of({ videoId: '123' });
  }
}

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let mockVideoService: MockVideoService;
  let toastr: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UploadComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: VideoService, useClass: MockVideoService },
        { provide: ToastrService, useValue: { success: jasmine.createSpy(), error: jasmine.createSpy() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    mockVideoService = TestBed.inject(VideoService) as unknown as MockVideoService;
    toastr = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the upload component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should mark title as invalid if empty', () => {
      component.uploadForm.get('title')?.setValue('');
      expect(component.uploadForm.get('title')?.invalid).toBeTrue();
    });

    it('should mark description as invalid if exceeds 160 characters', () => {
      component.uploadForm.get('description')?.setValue('a'.repeat(161));
      expect(component.uploadForm.get('description')?.invalid).toBeTrue();
    });

    it('should mark categories as invalid if empty', () => {
      component.uploadForm.get('categories')?.setValue('');
      expect(component.uploadForm.get('categories')?.invalid).toBeTrue();
    });

    it('should mark file as invalid if file is larger than 100 MB', () => {
      const largeFile = new File([new ArrayBuffer(100 * 1024 * 1024 + 1)], 'large-video.mp4');
      component.onFileChange({ target: { files: [largeFile] } } as any);
      expect(component.errors['file']).toBe('File size exceeds 100 MB limit.');
      expect(component.uploadForm.get('file')?.value).toBeNull();
    });
  });

  describe('File Upload', () => {
    it('should accept a valid file and set it correctly', () => {
      const validFile = new File([new ArrayBuffer(50 * 1024 * 1024)], 'video.mp4');
      component.onFileChange({ target: { files: [validFile] } } as any);
      expect(component.selectedFile).toBe(validFile);
      expect(component.errors['file']).toBe('');
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      component.uploadForm.patchValue({
        title: 'Test Video',
        description: 'Test description',
        categories: 'Test Category',
      });
      const validFile = new File([new ArrayBuffer(50 * 1024 * 1024)], 'video.mp4');
      component.onFileChange({ target: { files: [validFile] } } as any);
    });

    it('should call uploadVideo and navigate on successful upload', () => {
      spyOn(mockVideoService, 'uploadVideo').and.returnValue(of({ videoId: '123' }));
      spyOn(router, 'navigate');

      component.onSubmit();
      expect(mockVideoService.uploadVideo).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/streaming/123']);
      expect(toastr.success).toHaveBeenCalledWith('Video uploaded successfully!', 'Success');
    });

    it('should show error if upload fails', () => {
      spyOn(mockVideoService, 'uploadVideo').and.returnValue(throwError(() => new Error('Upload failed')));
      
      component.onSubmit();
      expect(toastr.error).toHaveBeenCalledWith('Failed to upload video. Please try again.', 'Error');
      expect(component.loading).toBeFalse();
    });

    it('should not proceed with upload if form is invalid', () => {
      component.uploadForm.get('title')?.setValue('');
      component.onSubmit();
      expect(component.errors['title']).toBe('Title is required.');
      expect(component.loading).toBeFalse();
    });
  });
});
