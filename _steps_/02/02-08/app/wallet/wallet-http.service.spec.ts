import { TestBed, inject } from '@angular/core/testing';

import { WalletHttpService } from './wallet-http.service';

describe('WalletHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletHttpService]
    });
  });

  it('should be created', inject([WalletHttpService], (service: WalletHttpService) => {
    expect(service).toBeTruthy();
  }));
});
