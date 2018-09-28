import { ReportItemsComponent } from './sub-site/report-items/report-items.component';
import { ReportLinksComponent } from './home/report-links/report-links.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule, MatInputModule, MatCardModule, MatDividerModule,
  MatToolbarModule, MatExpansionModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PostService } from './_services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { SubSiteComponent } from './sub-site/sub-site.component';


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      ReportLinksComponent,
      SubSiteComponent,
      ReportItemsComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      MatIconModule,
      MatProgressSpinnerModule,
      RouterModule.forRoot(appRoutes, {useHash: true})
   ],
   providers: [
      PostService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
