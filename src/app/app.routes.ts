import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MqttComponent } from "./mqtt/mqtt.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "Boiler Robotics Telemetry Dashboard",
  },
  {
    path: "mqtt",
    component: MqttComponent,
    title: "MQTT Config",
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];
