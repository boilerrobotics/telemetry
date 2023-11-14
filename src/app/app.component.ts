import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import { MqttDebugComponent } from "./mqtt-debug.component";
import { ManageMqttService } from "./manage-mqtt.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [provideEcharts()],
  imports: [
    RouterOutlet,
    NgxEchartsDirective,
    MqttDebugComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private _title = "Boiler Robotics";

  constructor(
    private _mqttService: ManageMqttService,
    private _titleService: Title
  ) {
    this._titleService.setTitle(this._title);
  }

  ngOnInit(): void {
    this._mqttService.initConnection();
  }

  ngOnDestroy(): void {
    this._mqttService.tearDown();
  }
}
