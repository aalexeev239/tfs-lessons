import {TestBed, inject} from '@angular/core/testing';

import {PurchasesService} from './purchases.service';
import {AngularFireDatabase} from 'angularfire2/database';
import Spy = jasmine.Spy;
import createSpyObj = jasmine.createSpyObj;

describe('PurchasesService', () => {
  let angularFireDatabaseSpy: Spy;

  beforeEach(() => {
    angularFireDatabaseSpy = createSpyObj('AngularFireDatabase', ['list']);

    TestBed.configureTestingModule({
      providers: [
        PurchasesService,
        {provide: AngularFireDatabase, useValue: angularFireDatabaseSpy}
      ]
    });
  });

  it('should be created', inject([PurchasesService], (service: PurchasesService) => {
    expect(service).toBeTruthy();
  }));
});
