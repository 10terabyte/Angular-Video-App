import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatToolbarModule,
        MatButtonModule,
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title "Video App"', () => {
    const titleElement = fixture.debugElement.query(By.css('.app-title')).nativeElement;
    expect(titleElement.textContent.trim()).toBe('Video App');
  });

  it('should have navigation buttons with correct labels and links', () => {
    const homeButton = fixture.debugElement.query(By.css('button[routerLink="/"]')).nativeElement;
    const uploadButton = fixture.debugElement.query(By.css('button[routerLink="/upload"]')).nativeElement;
    const aboutButton = fixture.debugElement.query(By.css('button[routerLink="/about"]')).nativeElement;

    expect(homeButton.textContent.trim()).toBe('Home');
    expect(uploadButton.textContent.trim()).toBe('Upload');
    expect(aboutButton.textContent.trim()).toBe('About');
  });
});
