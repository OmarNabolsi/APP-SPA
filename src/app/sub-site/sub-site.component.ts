import { ReportListService } from './../_services/report-list.service';
import { ReportModel } from './../models/report-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-site',
  templateUrl: './sub-site.component.html',
  styleUrls: ['./sub-site.component.css']
})
export class SubSiteComponent implements OnInit {
  reports: ReportModel[] = [];
  path = '';
  pageName = '';

  constructor(private route: ActivatedRoute,
    private reportListService: ReportListService) { }

  ngOnInit() {
    this.path = this.route.snapshot.params.url;
    this.pageName = localStorage.getItem('pageName');
    localStorage.removeItem('reportName');

    this.reportListService.getReports(this.path).subscribe((r: any) => {
      const results = r.d.results;
      for (let i = 0; i < results.length; i++) {
        const report: ReportModel = new ReportModel();
        if (results[i].Title === null) {
          report.title = this.insertSpaces(results[i].Name);
        } else {
          report.title = results[i].Title;
        }
        report.name = results[i].Name;
        report.relativeUrl = results[i].ServerRelativeUrl;
        this.reports.push(report);
      }
    }, err => {
      console.error(err);
    });
  }

  insertSpaces(name: string) {
    name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    name = name.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    name = name.replace('.rdl', '');
    return name;
  }
}
