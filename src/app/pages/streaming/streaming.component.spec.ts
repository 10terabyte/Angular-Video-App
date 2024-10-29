import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreamingComponent } from './streaming.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../../environment/environment';

describe('StreamingComponent', () => {
  let component: StreamingComponent;
  let fixture: ComponentFixture<StreamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '123' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the streaming component', () => {
    expect(component).toBeTruthy();
  });

  it('should set videoSource based on videoId from route', () => {
    const expectedUrl = `${environment.BACKEND_BASE_URL}/api/videos/stream/123`;
    expect(component.videoSource).toBe(expectedUrl);
  });
});
