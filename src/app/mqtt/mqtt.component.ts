import { Component, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";

import { MqttPayload } from "./mqtt.interface";
import { MqttService } from "./mqtt.service";

@Component({
  selector: "app-mqtt",
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: "./mqtt.component.html",
  styleUrl: "./mqtt.component.css",
})
export class MqttComponent {
  private _subscription!: Subscription;
  public columnsToDisplay: string[] = ["topic", "message", "qos"];
  public messages = signal<MqttPayload[]>([{ message: "", topic: "" }]);
  public dataSource = computed(() => {
    return new MatTableDataSource<MqttPayload>(this.messages());
  });

  constructor(private _mqttService: MqttService) {}

  ngOnInit() {
    this._mqttService.connect("66.253.158.154", 9001).then((message) => {
      console.log(message);
    });
    this._subscription = this._mqttService
      .subscribe("purdue-dac/#")
      .subscribe((message) => {
        this.messages.update((messages) =>
          [message, ...messages]
            .filter((message) => !message.packet?.retain)
            .slice(0, 10)
        );
      });
  }

  ngOndestroy() {
    this._subscription.unsubscribe();
  }
}
