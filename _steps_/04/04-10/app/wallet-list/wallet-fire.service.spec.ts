import {TestBed, inject} from '@angular/core/testing';

import {WalletFireService} from './wallet-fire.service';

describe('WalletFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletFireService]
    });
  });

  // it('should be created', inject([WalletFireService], (service: WalletFireService) => {
  //   expect(service).toBeTruthy();
  // }));
});
