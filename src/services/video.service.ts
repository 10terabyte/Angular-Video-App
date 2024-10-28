import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../app/Models/video.model';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);

  getVideos() {
    const fakeVideos: Video[] = [
      {
        id: '1',
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself...',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        categories: ['Animation', 'Adventure']
      },
      {
        id: '2',
        title: 'The first Blender Open Movie from 2006',
        description: 'The first open movie made with Blender.',
        thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
        categories: ['Animation', 'Drama']
      },
      {
        id: '3',
        title: 'For Bigger Blazes',
        description: 'A promotional video for bigger flames with Chromecast.',
        thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
        categories: ['Promotion', 'Technology']
      },
      {
        id: '4',
        title: 'For Bigger Escape',
        description: 'A creative ad promoting Chromecast.',
        thumbnailUrl: 'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        categories: ['Promotion', 'Adventure']
      },
      {
        id: '5',
        title: 'Sample Video 2',
        description: 'This is the description for Sample Video 2.',
        thumbnailUrl: 'https://via.placeholder.com/256',
        categories: ['Category1', 'Category3']
      },
      {
        id: '6',
        title: 'For Bigger Blazes',
        description: 'Another promotional video featuring Chromecast.',
        thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
        categories: ['Promotion', 'Technology']
      }
    ];
    return of(fakeVideos);
    // return this.http.get<Video[]>('/api/videos');
  }

  uploadVideo(data: FormData) {
    const fakeResponse = { message: 'Video uploaded successfully' };
    return of(fakeResponse);
    // return this.http.post('/api/upload', data);
  }

  getVideoUrl(id: string) {
    // return this.http.get(`/api/videos/${id}/stream`, { responseType: 'blob' });
    return of(new Blob());
  }
}
