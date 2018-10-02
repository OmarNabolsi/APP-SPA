
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isReady = false;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      const titlerow = document.getElementById('s4-titlerow');
      titlerow.style.visibility = 'hidden';
      titlerow.style.maxHeight = '0';
      titlerow.style.padding = '0';

      this.isReady = true;
    }, 1000);
  }

}
