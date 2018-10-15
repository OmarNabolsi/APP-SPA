import { SharedService } from './../_services/shared.service';
import { ReportListService } from './../_services/report-list.service';
import { ReportModel } from './../models/report-model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-site',
  templateUrl: './sub-site.component.html',
  styleUrls: ['./sub-site.component.css']
})
export class SubSiteComponent implements OnInit, AfterViewInit {
  reports: ReportModel[] = [];
  path = '';
  pageName = '';
  hasSubSites = false;
  sites: any[] = [];

  constructor(private route: ActivatedRoute,
    private reportListService: ReportListService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.path = this.route.snapshot.params.url;
    this.pageName = localStorage.getItem('pageName');
    localStorage.removeItem('reportName');

    this.reportListService.hasSubSite(this.path).subscribe((r: any) => {
      const results = r.d.results as any[];
      if (results.length > 0) {
        this.hasSubSites = true;
        this.reportListService.getReports(this.path).subscribe((rs: any) => {
          const results_ = rs.d.results;
          const homeReports: ReportModel[] = [];
          for (let i = 0; i < results_.length; i++) {
            const report: ReportModel = new ReportModel();
            if (results_[i].Title === null) {
              report.title = this.insertSpaces(results_[i].Name);
            } else {
              report.title = results_[i].Title;
            }
            report.name = results_[i].Name;
            report.relativeUrl = results_[i].ServerRelativeUrl;
            homeReports.push(report);
          }
          const subSite_ = {
            path: this.path,
            name: this.pageName,
            reports: homeReports
          };
          if (subSite_.reports.length > 0) {
            this.sites.push(subSite_);
          }
        }, err => {
          console.error(err);
        }, () => {
          for (let i = 0; i < results.length; i++) {
            const path_ = results[i].Url.split('/')[3] + '/' + results[i].Url.split('/')[4];
            const pageName_ = results[i].Title;
            const subReports: ReportModel[] = [];
            this.reportListService.getReports(path_).subscribe((rs1: any) => {
              const results_1 = rs1.d.results;
              for (let j = 0; j < results_1.length; j++) {
                const report: ReportModel = new ReportModel();
                if (results_1[j].Title === null) {
                  report.title = this.insertSpaces(results_1[j].Name);
                } else {
                  report.title = results_1[j].Title;
                }
                report.name = results_1[j].Name;
                report.relativeUrl = results_1[j].ServerRelativeUrl;
                subReports.push(report);
              }
              const subSite_1 = {
                path: path_,
                name: pageName_,
                reports: subReports
              };
              if (subSite_1.reports.length > 0) {
                this.sites.push(subSite_1);
              }
            }, err => {
              console.error(err);
            });
          }
        });

      } else {
        this.hasSubSites = false;
        this.reportListService.getReports(this.path).subscribe((rs: any) => {
          const results_ = rs.d.results;
          for (let i = 0; i < results_.length; i++) {
            const report: ReportModel = new ReportModel();
            if (results_[i].Title === null) {
              report.title = this.insertSpaces(results_[i].Name);
            } else {
              report.title = results_[i].Title;
            }
            report.name = results_[i].Name;
            report.relativeUrl = results_[i].ServerRelativeUrl;
            this.reports.push(report);
          }
        }, err => {
          console.error(err);
        });
      }
    }, error => console.log(error));

  }

  ngAfterViewInit() {
    this.sharedService.emitChange(true);
  }

  insertSpaces(name: string) {
    name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    name = name.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    name = name.replace('.rdl', '');
    return name;
  }
}
