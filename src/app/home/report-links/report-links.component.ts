import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-links',
  templateUrl: './report-links.component.html',
  styleUrls: ['./report-links.component.css']
})
export class ReportLinksComponent implements OnInit, AfterViewInit {
  @Input() portalPages: any = [];
  @Input() lastPage: Boolean = false;
  @Output() isFinished = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.lastPage) {
      this.isFinished.emit(this.lastPage);
    }
  }

  mouseOver(id) {
    document.getElementById(id).style.top = '0px';
    document.getElementById(id).style.transition = '0.3s';
  }

  public mouseOut(id) {
    document.getElementById(id).style.top = '100px';
  }

  pageNavigate(currentPage) {
    localStorage.setItem('pageName', currentPage.title);
    localStorage.setItem('pageUrl', currentPage.url.split('/')[3]);
    this.router.navigate(['subsite/', currentPage.url.split('/')[3]]); // {skipLocationChange: true});
  }

}
