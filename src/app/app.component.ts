import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";
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
  private mqtt$!: Observable<string>;

  constructor(private _titleService: Title) {
    this.mqtt$ = new Observable<string>((observer) => {
      const host = "ws://66.253.158.154:9001";
      const client = mqtt.connect(host);
      client.on("connect", () => {
        client.subscribe("purdue-dac/#");
      });
      client.on("message", (topic, message, packet) => {
        observer.next(message.toString());
        // console.log(
        //   "Received Message:= " + message.toString() + "\nOn topic:= " + topic
        // );
      });
    });
  }

  ngOnInit(): void {
    this._titleService.setTitle(this._title);
    this.mqtt$.subscribe((data) => console.log(data));
  }
}
