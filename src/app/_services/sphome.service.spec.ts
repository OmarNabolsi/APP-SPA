/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SphomeService } from './sphome.service';

describe('Service: Sphome', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SphomeService]
    });
  });

  it('should ...', inject([SphomeService], (service: SphomeService) => {
    expect(service).toBeTruthy();
  }));
});
