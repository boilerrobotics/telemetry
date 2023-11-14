import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttDebugComponent } from './mqtt-debug.component';

describe('MqttDebugComponent', () => {
  let component: MqttDebugComponent;
  let fixture: ComponentFixture<MqttDebugComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MqttDebugComponent]
    });
    fixture = TestBed.createComponent(MqttDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
