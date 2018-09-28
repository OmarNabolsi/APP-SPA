import { ReportFrameComponent } from './report-frame/report-frame.component';
import { SubSiteComponent } from './sub-site/sub-site.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'subsite/:url', component: SubSiteComponent },
    { path: 'report', component: ReportFrameComponent },
    { path: '#', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
