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

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

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
      this.path = data.path;
      this.reportName = data.name;
      this.reportUrl = data.url;
      this.reportTitle = data.title;
    });
  }

  ngAfterViewInit() {
    const rpframe = document.getElementById('rpframe') as HTMLIFrameElement;
    rpframe.width = rpframe.contentWindow.document.body.scrollWidth.toString() + 'px';
    rpframe.height = rpframe.contentWindow.document.body.scrollHeight.toString() + 'px';
  }

  reportSrcUrl() {
    this.reportFrameSrc = this.baseUrl + this.path + this.rsViewer + this.reportUrl + this.rvParams;
    const reportSrcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.reportFrameSrc);
    return reportSrcUrl;
  }

}
