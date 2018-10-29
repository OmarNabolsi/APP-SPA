import { SharedService } from './_services/shared.service';
import { SphomeService } from './_services/sphome.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isReady = false;
  curUser;
  isAdmin = false;
  isAdminPage = false;

  constructor(private sphomeService: SphomeService,
    private sharedService: SharedService) {
      this.sharedService.changeEmitted.subscribe((finished) => {
        if (!finished) {
          this.isReady = false;
        } else {
          setTimeout(() => {
            this.isReady = finished;
          }, 900);
        }
      });
      const dsuAdmin = window.location.hostname;
      if (dsuAdmin === 'dsuadmin.aubmc.org.lb') {
        this.isAdminPage = true;
      }
  }

  ngOnInit() {
    if (!this.isAdminPage) {
      setTimeout(() => {
        const titlerow = document.getElementById('s4-titlerow');
        if (titlerow) {
          titlerow.style.visibility = 'hidden';
          titlerow.style.maxHeight = '0';
          titlerow.style.padding = '0';
        }

        const sideNavBox = document.getElementById('sideNavBox');
        if (sideNavBox) {
          sideNavBox.style.visibility = 'hidden';
          sideNavBox.style.maxHeight = '0';
          sideNavBox.style.padding = '0';
        }

        const suiteBar = document.getElementById('suiteBar');
        if (suiteBar) {
          suiteBar.style.display = 'none';
        }

        const s4ribbonrow = document.getElementById('s4-ribbonrow');
        if (s4ribbonrow) {
          s4ribbonrow.style.display = 'none';
        }

        const contentRow = document.getElementById('contentRow');
        if (contentRow) {
          contentRow.style.paddingTop = '1px';
        }

        // const rtestate = document.getElementsByClassName('ms-rtestate-read').item(1) as HTMLDivElement;
        // rtestate.style.marginTop = '-45px';

        const WebPartWPQ2_ChromeTitle = document.getElementById('WebPartWPQ2_ChromeTitle');
        if (WebPartWPQ2_ChromeTitle) {
          WebPartWPQ2_ChromeTitle.style.display = 'none';
        }

        // this.isReady = true;
        this.shouldShowSettings();
      }, 100);
    }
  }

  toggleSettings() {
    const suiteBar = document.getElementById('suiteBar');
    suiteBar.style.display = 'table-row';
    const sptopmenu = document.getElementById('sptopmenu');
    sptopmenu.style.height = '15px';
    const sptglbtn = document.getElementById('sptglbtn');
    sptglbtn.style.display = 'none';
  }

  shouldShowSettings() {
    this.sphomeService.getCurrentUser().subscribe((res: any) => {
      this.curUser = res.d.Id;
    }, error => console.log(error));

    this.sphomeService.getAdmins().subscribe((res: any) => {
      const admins = res.d.results;
      for (let i = 0; i < admins.length; i++) {
        const userNameId = admins[i].UsernameId;
        if (this.curUser === userNameId) {
          this.isAdmin = true;
        }
      }
    }, error => console.log(error));
  }
}
