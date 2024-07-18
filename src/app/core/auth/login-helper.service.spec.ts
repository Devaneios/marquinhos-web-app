/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginHelperService } from './login-helper.service';

describe('Service: LoginHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginHelperService]
    });
  });

  it('should ...', inject([LoginHelperService], (service: LoginHelperService) => {
    expect(service).toBeTruthy();
  }));
});
