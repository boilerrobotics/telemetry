import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { MqttService } from "../mqtt/mqtt.service";
import { MqttPayload } from "../mqtt/mqtt.interface";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  public mqttMessage$?: Observable<MqttPayload>;

  constructor(private _mqttService: MqttService) {}

  ngOnInit(): void {
    this._mqttService.connect("66.253.158.154", 9001).then((message) => {
      console.log(message);
    });
    this.mqttMessage$ = this._mqttService.subscribe("purdue-dac/#");
  }
}
