import { Component, OnDestroy, OnInit } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Subscription } from "rxjs";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private _title = "Boiler Robotics";
  private subscription$!: Subscription;
  public message!: string;
  public topic: string = "purdue-brc/#";
  public connectionStatus: string = "connecting";

  constructor(private _mqttService: MqttService, private _titleService: Title) {
    this._titleService.setTitle(this._title);
  }

  ngOnInit(): void {
    this._mqttService.onConnect.subscribe((message) => {
      if (message.cmd == "connack") {
        console.log(`connack received`);
        this.changeTopic();
      }
    });

    this._mqttService.onSuback.subscribe((message) => {
      if (message.granted) {
        this.connectionStatus = "connected";
        console.log(`Subscribed to ${message.filter}`);
      }
    });
  }

  changeTopic(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    this.subscription$ = this._mqttService
      .observe(this.topic)
      .subscribe((message: IMqttMessage) => {
        this.extractPayload(message);
      });

    console.log(`Subscribing to ${this.topic} ...`);
  }

  extractPayload(message: IMqttMessage): void {
    this.message = `Received ${message.payload.toString()} from topic ${
      message.topic
    }`;

    console.log(this.message);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
