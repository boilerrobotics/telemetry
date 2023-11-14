import { Component, OnDestroy, OnInit } from "@angular/core";
import { IMqttMessage } from "ngx-mqtt";
import { Observable } from "rxjs";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
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
    CommonModule,
    NgxEchartsDirective,
    MqttDebugComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private _title = "Boiler Robotics";
  private _topic = "purdue-dac/#";

  public mqtt$?: Observable<IMqttMessage>;
  public connectionStatus: string = "connecting";

  constructor(
    private _mqttService: ManageMqttService,
    private _titleService: Title
  ) {
    this._titleService.setTitle(this._title);
  }

  ngOnInit(): void {
    this.mqtt$ = this._mqttService.initConnection(this._topic);
  }

  ngOnDestroy(): void {
    this._mqttService.unSubscription();
  }
}
