import { TestBed } from '@angular/core/testing';

import { EtcdappService } from './etcdapp.service';

describe('EtcdappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtcdappService = TestBed.get(EtcdappService);
    expect(service).toBeTruthy();
  });
});
