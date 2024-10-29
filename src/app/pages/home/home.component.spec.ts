import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { VideoService } from '../../../services/video.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';

// Mock data
const mockVideos = [
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

class MockVideoService {
  getVideos() {
    return of(mockVideos);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        MatCardModule,
        MatTooltipModule,
        MatIconModule,
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: VideoService, useClass: MockVideoService }, 
        provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display videos', () => {
    const videoCards = fixture.debugElement.queryAll(By.css('.video-card'));
    expect(videoCards.length).toBe(mockVideos.length);

    videoCards.forEach((card, index) => {
      const video = mockVideos[index];
      const titleElement = card.query(By.css('.title')).nativeElement;
      const descriptionElement = card.query(By.css('.description')).nativeElement;
      const categoriesElement = card.query(By.css('.metadata span')).nativeElement;
      
      expect(titleElement.textContent).toContain(video.title);
      expect(descriptionElement.textContent).toContain(video.description.slice(0, 160));
      expect(categoriesElement.textContent).toContain(video.categories.join(', '));
    });
  });

  it('should navigate to the video streaming page when a video card is clicked',fakeAsync( () => {
    const videoCards = fixture.debugElement.queryAll(By.css('.video-card'));
    const firstVideoCard = videoCards[0];
    firstVideoCard.nativeElement.click();
    flush();
    fixture.detectChanges();
    const firstVideoId = mockVideos[0].id;
    fixture.whenStable().then(() => {
      expect(router.url).toBe(`/streaming/${firstVideoId}`);
    })
  }));
});
