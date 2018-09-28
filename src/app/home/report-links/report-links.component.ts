import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-links',
  templateUrl: './report-links.component.html',
  styleUrls: ['./report-links.component.css']
})
export class ReportLinksComponent implements OnInit {
  @Input() portalPages: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mouseOver(id) {
    document.getElementById(id).style.top = '0px';
    document.getElementById(id).style.transition = '0.3s';
  }

  public mouseOut(id) {
    document.getElementById(id).style.top = '100px';
  }

  pageNavigate(currentPage) {
    this.router.navigate(['subsite/', currentPage.url.split('/')[3]]); // {skipLocationChange: true});
  }

}
