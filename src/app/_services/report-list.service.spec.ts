/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportListService } from './report-list.service';

describe('Service: ReportList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportListService]
    });
  });

  it('should ...', inject([ReportListService], (service: ReportListService) => {
    expect(service).toBeTruthy();
  }));
});
