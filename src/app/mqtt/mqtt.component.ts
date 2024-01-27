import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

import { MqttPayload } from "./mqtt.interface";
import { MqttService } from "./mqtt.service";

@Component({
  selector: "app-mqtt",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: "./mqtt.component.html",
  styleUrl: "./mqtt.component.css",
})
export class MqttComponent {
  private _subscription!: Subscription;
  public connectionStatus: boolean = false;
  public columnsToDisplay: string[] = ["timestamp", "topic", "message", "qos"];
  public messages = signal<MqttPayload[]>([{ message: "", topic: "" }]);

  constructor(private _mqttService: MqttService) {}

  ngOnInit() {
    this._mqttService
      .connect("66.253.158.154", 9001)
      .then((status) => (this.connectionStatus = status));
    this._subscription = this._mqttService
      .subscribe("purdue-dac/#")
      .subscribe((message) => {
        this.messages.update((messages) => {
          message.timestamp = Date.now();
          return [message, ...messages]
            .filter((message) => !message.packet?.retain)
            .slice(0, 10);
        });
      });
  }

  ngOndestroy() {
    this._subscription.unsubscribe();
  }
}
