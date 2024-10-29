import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideoService } from './video.service';
import { Video } from '../app/Models/video.model';
import { environment } from '../environment/environment';

describe('VideoService', () => {
  let service: VideoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideoService],
    });
    service = TestBed.inject(VideoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch videos with getVideos', () => {
    const mockVideos: Video[] = [
      {
        id: '1',
        title: 'Sample Video 1',
        description: 'This is a sample description for video 1',
        thumbnailPath: 'path/to/thumbnail1.jpg',
        categories: ['Category1', 'Category2']
      },
      {
        id: '2',
        title: 'Sample Video 2',
        description: 'This is a sample description for video 2',
        thumbnailPath: 'path/to/thumbnail2.jpg',
        categories: ['Category3', 'Category4']
      }
    ];

    service.getVideos().subscribe((videos) => {
      expect(videos).toEqual(mockVideos);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_BASE_URL}/api/videos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVideos);
  });

  it('should upload video with uploadVideo', () => {
    const mockResponse = { success: true };
    const formData = new FormData();

    service.uploadVideo(formData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_BASE_URL}/api/videos/upload`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return a blob for getVideoUrl', () => {
    service.getVideoUrl('123').subscribe((blob) => {
      expect(blob).toBeInstanceOf(Blob);
    });
  });
});
