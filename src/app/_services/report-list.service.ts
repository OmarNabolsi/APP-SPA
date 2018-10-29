import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json; odata=verbose'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportListService {
  baseUrl = 'https://dsu.aubmc.org.lb/';
  subSitesUrl = '/_api/web/webs/';
  subSitesQuery = '?$select=Id,Title,Description,SiteLogoUrl,Url&$filter=effectivebasepermissions/high%20gt%2032';
  endPoint = '/_api/Web/GetFolderByServerRelativeUrl(\'/';
  folderDir = '/Shared%20Documents/SSRS_Reports\')/Files';
  hrFolderDir = '/Documents/SSRS_Reports\')/Files';
  listQuery = '?$select=Title,Name,ServerRelativeUrl';
  filter = '&$filter=substringof(\'.rdl\',Name)';
  orderby = '&$OrderBy=Name';

  constructor(private http: HttpClient) { }

  hasSubSite(pageName) {
    return this.http.get(this.baseUrl + pageName + this.subSitesUrl + this.subSitesQuery, httpOptions);
  }

  getReports(pageName) {
    let foldDir = this.folderDir;
    if (pageName === 'HR') {
      foldDir = this.hrFolderDir;
    }
    return this.http.get(this.baseUrl + pageName + this.endPoint + pageName
      + foldDir + this.listQuery + this.filter + this.orderby , httpOptions);
  }

  getReportByName(pageName, reportName) {
    this.filter = '&$filter=Name eq \'' + reportName + '\'';
    let foldDir = this.folderDir;
    if (pageName === 'HR') {
      foldDir = this.hrFolderDir;
    }
    return this.http.get(this.baseUrl + pageName + this.endPoint + pageName + foldDir + this.listQuery + this.filter, httpOptions);
  }
}
