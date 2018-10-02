import { Router, NavigationExtras } from '@angular/router';
import { ReportModel } from './../../models/report-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-items',
  templateUrl: './report-items.component.html',
  styleUrls: ['./report-items.component.css']
})
export class ReportItemsComponent implements OnInit {
  @Input() report: ReportModel;
  @Input() path: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mouseEnter(id) {
    document.getElementById(id + '.1').classList.add('sp-item-title-hover');
    document.getElementById(id + '.2').classList.add('sp-item-title-hover');
    document.getElementById(id + '.3').style.visibility = 'visible';
  }

  mouseLeave(id) {
    document.getElementById(id + '.1').classList.remove('sp-item-title-hover');
    document.getElementById(id + '.2').classList.remove('sp-item-title-hover');
    document.getElementById(id + '.3').style.visibility = 'hidden';
  }

  navigateTo() {
    // this.router.navigate(['report/', this.path, this.report.name]);
    const extras: NavigationExtras = {
      queryParams: {
        'path': this.path,
        'name': this.report.name,
        'rpUrl': this.report.relativeUrl,
        'title': this.report.title
      },
      skipLocationChange: true,
      preserveFragment: true
    };
    localStorage.setItem('reportName', this.report.title);
    this.router.navigate(['report'], extras);
  }
}
