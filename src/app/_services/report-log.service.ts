import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json; odata=verbose',
    'Content-Type': 'application/json;odata=verbose'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportLogService {
  type = 'SP.Data.Reports_x0020_LogsListItem';

  constructor(private http: HttpClient) { }

  createLog(rLog, digest) {
    const data = {
      __metadata: { type: this.type },
      Title: rLog.title
    };

    const httpHeaderOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json; odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': digest
      })
    };

    return this.http.post('https://dsu.aubmc.org.lb/_api/lists/getbytitle(\'Reports Logs\')/items', data, httpHeaderOptions);
  }
}
