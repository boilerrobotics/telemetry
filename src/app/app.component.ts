import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import mqtt from "mqtt";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [provideEcharts()],
  imports: [RouterOutlet, NgxEchartsDirective],
})
export class AppComponent implements OnInit {
  private _title = "Boiler Robotics Telemetry";

  constructor(private _titleService: Title) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._title);
    const host = "ws://66.253.158.154:9001";
    console.log("connecting mqtt client");
    const client = mqtt.connect(host);
    console.log(client);
    client.on("connect", () => {
      console.log("client connected:");
      client.subscribe("purdue-dac/#");
    });
    client.on("message", (topic, message, packet) => {
      console.log(
        "Received Message:= " + message.toString() + "\nOn topic:= " + topic
      );
    });
  }
}
