import { TestBed } from '@angular/core/testing';

import { ManageMqttService } from './manage-mqtt.service';

describe('ManageMqttService', () => {
  let service: ManageMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
