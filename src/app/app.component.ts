import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [provideEcharts()],
  imports: [
    RouterOutlet,
    MatSidenavModule,
    NgxEchartsDirective,
    NavbarComponent,
  ],
})
export class AppComponent {

  constructor() {}

  mouseEnter() {
    console.log("enter");
  }
  mouseOut() {
    console.log("exit");
  }
}
