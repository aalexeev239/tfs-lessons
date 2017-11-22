import { TestBed, inject } from '@angular/core/testing';

import { WalletListService } from './wallet-list.service';

describe('WalletListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletListService]
    });
  });

  it('should be created', inject([WalletListService], (service: WalletListService) => {
    expect(service).toBeTruthy();
  }));
});
