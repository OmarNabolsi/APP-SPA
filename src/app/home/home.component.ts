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

  constructor(private spHome: SphomeService) { }

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
      console.log(this.portalLinks);
    }, error => {
      console.log(error);
    });
  }
}
