import { SharedService } from './../_services/shared.service';
import { ReportLogService } from './../_services/report-log.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-report-frame',
  templateUrl: './report-frame.component.html',
  styleUrls: ['./report-frame.component.css']
})
export class ReportFrameComponent implements OnInit, AfterViewInit {
  path = '';
  reportUrl = '';
  reportName = '';
  reportTitle = '';
  baseUrl = 'https://dsu.aubmc.org.lb/';
  rsViewer = '/_layouts/15/ReportServer/RSViewerPage.aspx?rv:RelativeReportUrl=';
  rvParams = '&rv:HeaderArea=None&rv:ToolBar=Full&rv:ToolBarItemsDisplayMode=-1';
  reportFrameSrc = '';
  pageUrl = '';
  pageName = '';
  iframeLoaded = false;
  reqDigest: string;
  reportSrc;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private reportLogService: ReportLogService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.pageUrl = localStorage.getItem('pageUrl');
    this.pageName = localStorage.getItem('pageName');

    this.route.queryParamMap.pipe(
      map(params => {
        const data = {
          path: params.get('path') || 'None',
          name: params.get('name') || 'None',
          url: params.get('rpUrl') || 'None',
          title: params.get('title') || 'None'
        };
        return data;
      })
    ).subscribe(data => {
      this.sharedService.emitChange(false);
      this.path = data.path;
      this.reportName = data.name;
      this.reportUrl = data.url;
      this.reportTitle = data.title;
      this.reportSrcUrl();
      this.sharedService.emitChange(true);
    }, error => {
      console.log(error);
      this.sharedService.emitChange(true);
    });

    this.reqDigest = (document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value;
  }

  ngAfterViewInit() {
    this.sharedService.emitChange(true);
  }

  reportSrcUrl() {
    this.reportFrameSrc = this.baseUrl + this.path + this.rsViewer + this.reportUrl + this.rvParams;
    this.reportSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.reportFrameSrc);
    setTimeout(() => {
      this.onLoaded();
    }, 1000);
  }

  onLoaded() {
    if (!this.iframeLoaded) {
      const rlog = { title: this.reportTitle };
      this.iframeLoaded = true;
      this.reportLogService.createLog(rlog, this.reqDigest).subscribe((res: any) => {
        const rpframe = document.getElementById('rpframe') as HTMLIFrameElement;
        rpframe.width = rpframe.contentWindow.document.body.scrollWidth.toString() + 'px';
        rpframe.height = '1250px';
        // rpframe.width = rpframe.contentWindow.document.body.scrollWidth.toString() + 'px';
        // rpframe.height = '1250px';
        // const reportCell_id = (rpframe.contentDocument.querySelector('[id$="ReportCell"]') ?
        //     rpframe.contentDocument.querySelector('[id$="ReportCell"]').id : null);
        // console.log(reportCell_id);
        // if (reportCell_id) {
        //   const reportCell = rpframe.contentDocument.getElementById(reportCell_id);
        //   console.log(reportCell.clientHeight);
        //   console.log(reportCell.clientWidth);
        //   rpframe.height = String(reportCell.clientHeight + 50) + 'px';
        //   rpframe.width = String(reportCell.clientWidth + 50) + 'px';
        // } else {
        //   rpframe.height = '400px';
        // }

      }, error => {
        console.log(error);
        const rpframe = document.getElementById('rpframe') as HTMLIFrameElement;
        rpframe.width = rpframe.contentWindow.document.body.scrollWidth.toString() + 'px';
        rpframe.height = '1250px';
      });
    }
  }
}
