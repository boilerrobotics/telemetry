import mqtt from "mqtt";

export interface MqttPayload {
  topic: string;
  message: string;
  packet?: mqtt.IPublishPacket;
  timestamp?: Date | number;
}
