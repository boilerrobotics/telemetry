import { Injectable } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManageMqttService {
  private _onConnectSubscription?: Subscription;
  private _onSubackSubscription?: Subscription;
  private _currentTopic = "not subscribed";

  constructor(private _mqttService: MqttService) {}

  initConnection(topic: string): Observable<IMqttMessage> {
    this._onConnectSubscription = this._mqttService.onConnect.subscribe(
      (message) => {
        if (message.cmd == "connack") {
          console.log("Received connack. Connection established");
        }
      }
    );
    this._mqttService.onSuback.subscribe((message) => {
      if (message.granted) {
        this._currentTopic = message.filter;
        console.log(`Subscribed to ${this._currentTopic}`);
      }
    });
    return this._mqttService.observe(topic);
  }

  extractPayload(rawMessage: IMqttMessage): string {
    let message = `Received ${rawMessage.payload.toString()} from topic ${
      rawMessage.topic
    }`;
    console.log(message);
    return message;
  }

  changeTopic(topic: string): Observable<IMqttMessage> {
    console.log(`Subscribing to ${topic} ...`);
    return this._mqttService.observe(topic);
  }

  getTopic(): string {
    return this._currentTopic;
  }

  unSubscription(): void {
    this._onConnectSubscription?.unsubscribe();
    this._onSubackSubscription?.unsubscribe();
  }
}
