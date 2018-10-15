/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportLogService } from './report-log.service';

describe('Service: ReportLog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportLogService]
    });
  });

  it('should ...', inject([ReportLogService], (service: ReportLogService) => {
    expect(service).toBeTruthy();
  }));
});
