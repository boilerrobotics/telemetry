import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import mqtt from "mqtt";
import { MqttPayload } from "./mqtt.interface";

@Injectable({
  providedIn: "root",
})
export class MqttService {
  private client!: mqtt.MqttClient;

  constructor() {}

  connect(hostUrl: string, port: Number): Promise<string> {
    this.client = mqtt.connect(`ws://${hostUrl}:${port}`);
    return new Promise<string>((resolve) => {
      this.client.on("connect", () => {
        resolve("Connected!");
      });
    });
  }

  subscribe(topic: string | string[]): Observable<MqttPayload> {
    this.client.subscribe(topic, (err, granted) => {
    });

    return new Observable<MqttPayload>((observer) => {
      this.client.on("message", (topic, message, packet) => {
        observer.next({
          message: message.toString(),
          topic: topic,
          packet: packet,
        });
      });
    });
  }
}
