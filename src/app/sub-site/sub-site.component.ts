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
  isHR = false;
  sites: any[] = [];

  constructor(private route: ActivatedRoute,
    private reportListService: ReportListService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.path = this.route.snapshot.params.url;
    this.pageName = localStorage.getItem('pageName');
    localStorage.removeItem('reportName');
    this.isHR = this.pageName === 'HR';

    this.reportListService.hasSubSite(this.path).subscribe((r: any) => {
      this.sharedService.emitChange(false);
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
            if (results_[i].Title !== 'Sub-report') {
              homeReports.push(report);
            }
          }
          const subSite_ = {
            path: this.path,
            name: this.pageName,
            reports: homeReports
          };
          if (subSite_.reports.length > 0) {
            this.sites.push(subSite_);
          }
          this.sharedService.emitChange(true);
        }, err => {
          console.error(err);
          this.sharedService.emitChange(true);
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
                if (results_1[j].Title !== 'Sub-report') {
                  subReports.push(report);
                }
              }
              const subSite_1 = {
                path: path_,
                name: pageName_,
                reports: subReports
              };
              if (subSite_1.reports.length > 0) {
                this.sites.push(subSite_1);
              }
              this.sharedService.emitChange(true);
            }, err => {
              console.error(err);
              this.sharedService.emitChange(true);
            });
          }
        });
        this.sharedService.emitChange(true);
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
            if (results_[i].Title !== 'Sub-report') {
              this.reports.push(report);
            }
          }
          if (this.isHR) {
            const empList = {
              title: 'Employee List (Detailed)',
              name: 'empList',
              relativeUrl: ''
            };
            this.reports.push(empList);
          }
          this.sharedService.emitChange(true);
        }, err => {
          console.error(err);
          this.sharedService.emitChange(true);
        });
      }
    }, error => {
      console.log(error);
      this.sharedService.emitChange(true);
    });
    this.sharedService.emitChange(true);
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
