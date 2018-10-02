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
  endPoint = '/_api/Web/GetFolderByServerRelativeUrl(\'/';
  folderDir = '/Shared%20Documents/SSRS_Reports\')/Files';
  listQuery = '?$select=Title,Name,ServerRelativeUrl';
  filter = '';

  constructor(private http: HttpClient) { }

  getReports(pageName) {
    return this.http.get(this.baseUrl + pageName + this.endPoint + pageName + this.folderDir + this.listQuery, httpOptions);
  }

  getReportByName(pageName, reportName) {
    this.filter = '&$filter=Name eq \'' + reportName + '\'';
    return this.http.get(this.baseUrl + pageName + this.endPoint + pageName + this.folderDir + this.listQuery + this.filter, httpOptions);
  }
}
