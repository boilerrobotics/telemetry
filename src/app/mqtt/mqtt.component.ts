import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { MatTableModule } from "@angular/material/table";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { MqttPayload } from "./mqtt.interface";
import { MqttService } from "./mqtt.service";

@Component({
  selector: "app-mqtt",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: "./mqtt.component.html",
  styleUrl: "./mqtt.component.css",
})
export class MqttComponent {
  private _subscription!: Subscription;
  public connectionStatus: boolean = false;
  public columnsToDisplay: string[] = ["timestamp", "topic", "message", "qos"];
  public messages = signal<MqttPayload[]>([{ message: "", topic: "" }]);
  public mqttInfoForm = this._fb.group({
    brokerUrl: [environment.brokerUrl, Validators.required],
    brokerPort: [environment.brokerPort, Validators.required],
    topic: [environment.defaultTopic, Validators.required],
  });

  constructor(private _mqttService: MqttService, private _fb: FormBuilder) {}

  ngOnInit() {
    this._mqttService
      .connect("66.253.158.154", 9001)
      .then((status) => (this.connectionStatus = status));
    this._subscription = this._mqttService
      .subscribe("purdue-dac/#")
      .subscribe((message) => {
        this.messages.update((messages) => {
          // add timestamp
          message.timestamp = Date.now();
          // only return the latest 10 messages excluding retain messages
          return [message, ...messages]
            .filter((message) => !message.packet?.retain)
            .slice(0, 10);
        });
      });
  }

  connect() {
    console.log(this.mqttInfoForm.value);
  }

  ngOndestroy() {
    this._subscription.unsubscribe();
  }
}
