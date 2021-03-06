import { ReportItemsComponent } from './sub-site/report-items/report-items.component';
import { ReportLinksComponent } from './home/report-links/report-links.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatProgressSpinnerModule, MatTabsModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { SubSiteComponent } from './sub-site/sub-site.component';
import { ReportFrameComponent } from './report-frame/report-frame.component';


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      ReportLinksComponent,
      SubSiteComponent,
      ReportItemsComponent,
      ReportFrameComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTabsModule,
      RouterModule.forRoot(appRoutes, {useHash: true}),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
