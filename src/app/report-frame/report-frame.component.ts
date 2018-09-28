import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-report-frame',
  templateUrl: './report-frame.component.html',
  styleUrls: ['./report-frame.component.css']
})
export class ReportFrameComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const rpframe = document.getElementById('rpframe') as HTMLIFrameElement;
    rpframe.width = rpframe.contentWindow.document.body.scrollWidth.toString() + 'px';
    rpframe.height = rpframe.contentWindow.document.body.scrollHeight.toString() + 'px';
    console.log(rpframe.contentWindow.document.body.scrollHeight.toString());
    console.log('ngAfterViewInit: ' + rpframe.height);
  }

}
