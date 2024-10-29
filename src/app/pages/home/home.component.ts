import { Component, signal, WritableSignal } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { Router, RouterModule } from '@angular/router';
import { Video } from '../../Models/video.model';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule, MatIconModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  videos: WritableSignal<Video[]> = signal([]);
  backendUrl = environment.BACKEND_BASE_URL
  constructor(private videoService: VideoService, private router: Router) {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos().subscribe((videos) => this.videos.set(videos));
  }

  viewVideo(id: string) {
    this.router.navigate(['/stream', id]);
  }
}
