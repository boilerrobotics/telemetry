import { Component, OnDestroy } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Subscription } from "rxjs";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [RouterOutlet, FormsModule],
})
export class AppComponent implements OnDestroy {
  private _title = "Boiler Robotics";
  private subscription$!: Subscription;
  public message!: string;
  public topic: string = "purdue-brc/#";

  // Need to use onConnect and onDisconnent to check connection status

  constructor(private _mqttService: MqttService, private _titleService: Title) {
    this._titleService.setTitle(this._title);
  }

  ngOnInit(): void {
    this.changeTopic();
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
