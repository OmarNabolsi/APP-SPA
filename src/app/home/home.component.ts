import { Router } from '@angular/router';
import { SphomeService } from './../_services/sphome.service';
import { PortalLinkModel } from './../models/portal-link-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  portalLinks: PortalLinkModel[] = [];

  constructor(private spHome: SphomeService,
    private router: Router) { }

  ngOnInit() {
    this.onGetSubSites();
  }

  onGetSubSites() {
    this.spHome.getSubSites().subscribe((r: any) => {
      const results = r.d.results;
      for (let i = 0; i < results.length; i++) {
        const pLink: PortalLinkModel = new PortalLinkModel();
        pLink.num = results[i].Id;
        pLink.title =  results[i].Title;
        pLink.description = results[i].Description;
        pLink.imageUrl = results[i].SiteLogoUrl;
        pLink.url = results[i].Url;
        this.portalLinks.push(pLink);
      }
      localStorage.removeItem('pageName');
      localStorage.removeItem('pageUrl');
      localStorage.removeItem('reportName');
    }, error => {
      console.log(error);
    });
  }

  goToQlikView() {
    this.router.navigateByUrl('http://qlikview-srv/qlikview/index.htm');
  }

  geToRequest() {
    this.router.navigateByUrl('https://his.aubmc.org.lb/eforms/formDashboard.aspx?id=748&bp=1');
  }
}
