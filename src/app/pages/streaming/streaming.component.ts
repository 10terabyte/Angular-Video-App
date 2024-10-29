import { Component } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-streaming',
  standalone: true,
  imports: [],
  templateUrl: './streaming.component.html',
  styleUrl: './streaming.component.scss'
})
export class StreamingComponent {
  backendUrl = environment.BACKEND_BASE_URL;
  videoSource: string = ''; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const videoId = params.get('id');
      if (videoId) {
        this.videoSource = `${this.backendUrl}/api/videos/stream/${videoId}`;
        console.log(this.videoSource)
      }
    });
  }
}
