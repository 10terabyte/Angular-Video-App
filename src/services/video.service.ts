import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../app/Models/video.model';
import { of } from 'rxjs';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);
  private baseUrl = environment.BACKEND_BASE_URL
  getVideos() {
    return this.http.get<Video[]>(`${this.baseUrl}/api/videos`);
  }

  uploadVideo(data: FormData) {
    return this.http.post(`${this.baseUrl}/api/videos/upload`, data);
  }

  getVideoUrl(id: string) {
    // return this.http.get(`/api/videos/${id}/stream`, { responseType: 'blob' });
    return of(new Blob());
  }
}
