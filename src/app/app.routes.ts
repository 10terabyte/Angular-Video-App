import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { StreamingComponent } from './streaming/streaming.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'streaming/:id', component: StreamingComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
