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
export class SphomeService {
  // subSitesUrl = 'https://dsu.aubmc.org.lb/_api/web/GetSubwebsFilteredForCurrentUser(nWebTemplateFilter=-1,nConfigurationFilter=-1)';
  // subSiteQuery = '?$select=Title,Description,SiteLogoUrl,ServerRelativeUrl';
  baseUrl = 'https://dsu.aubmc.org.lb/';
  subSitesUrl = '_api/web/webs/';
  subSitesQuery = '?$select=Id,Title,Description,SiteLogoUrl,Url&$filter=effectivebasepermissions/high%20gt%2032';
  siteRoles = '_api/web/roledefinitions';

  constructor(private http: HttpClient) { }

  getPages() {
    // tslint:disable-next-line:quotemark
    return this.http.get(this.baseUrl + "_api/lists/getbytitle('PortalPages')/items", httpOptions );
  }

  getSubSites() {
    return this.http.get(this.baseUrl + this.subSitesUrl + this.subSitesQuery, httpOptions);
  }

  getSiteRoles() {
    return this.http.get(this.baseUrl + this.siteRoles, httpOptions);
  }

  getAdmins() {
    return this.http.get(this.baseUrl + '_api/lists/getbytitle(\'Admins\')/items', httpOptions);
  }

  getCurrentUser() {
    return this.http.get(this.baseUrl + '_api/web/currentUser', httpOptions);
  }
}
