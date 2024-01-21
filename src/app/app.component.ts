import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [provideEcharts()],
  imports: [RouterOutlet, NgxEchartsDirective],
})
export class AppComponent {
  private _title = "Boiler Robotics Telemetry";

  constructor(private _titleService: Title) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._title);
  }
}
