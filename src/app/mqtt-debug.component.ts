import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ManageMqttService } from "./manage-mqtt.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-mqtt-debug",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-x-4">
      Topic <input class="border-black border-2" type="text" [(ngModel)]="topic" />
      <button class="border-rose-500 border-2 rounded-full px-2" (click)="changeTopic()">Subscribe</button>
    </div>
    <p class="text-xl">{{ message }}</p>
  `,
  styles: [],
})
export class MqttDebugComponent implements OnInit, OnDestroy {
  private _messageSubscription?: Subscription;

  public message?: string;
  public topic = "purdue-dac/#";

  constructor(private _mqttService: ManageMqttService) {}

  ngOnInit(): void {
    this._messageSubscription = this.subscribe();
  }

  subscribe(): Subscription {
    return this._mqttService.changeTopic(this.topic).subscribe((payload) => {
      this.message = this._mqttService.extractPayload(payload, true);
    });
  }

  changeTopic() {
    this._messageSubscription?.unsubscribe();
    this._messageSubscription = this.subscribe();
  }

  ngOnDestroy(): void {
    this._messageSubscription?.unsubscribe();
  }
}
