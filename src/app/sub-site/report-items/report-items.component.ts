import { ReportModel } from './../../models/report-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-items',
  templateUrl: './report-items.component.html',
  styleUrls: ['./report-items.component.css']
})
export class ReportItemsComponent implements OnInit {
  @Input() report: ReportModel;

  constructor() { }

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
}
