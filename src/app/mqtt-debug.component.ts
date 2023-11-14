import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, Subscription } from "rxjs";
import { IMqttMessage } from "ngx-mqtt";
import { ManageMqttService } from "./manage-mqtt.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-mqtt-debug",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <input type="text" [(ngModel)]="topic" />
      <button (click)="changeTopic()">Subscribe</button>
    </div>
    <p>{{ message }}</p>
  `,
  styles: [],
})
export class MqttDebugComponent implements OnInit, OnDestroy {
  @Input() mqtt$?: Observable<IMqttMessage>;

  private _messageSubscription?: Subscription;

  public message?: string;
  public topic?: string;

  constructor(private _mqttService: ManageMqttService) {}

  ngOnInit(): void {
    this._messageSubscription = this.mqtt$?.subscribe((payload) => {
      this.message = this._mqttService.extractPayload(payload);
    });
    this.topic = this._mqttService.getTopic();
  }

  changeTopic() {
    this.mqtt$ = this._mqttService.changeTopic(this.topic!);
  }

  ngOnDestroy(): void {
    this._messageSubscription?.unsubscribe();
  }
}
