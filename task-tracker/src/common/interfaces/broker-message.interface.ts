export interface BrokerMessage {
  event_id: string;
  event_version: number;
  event_name: string;
  event_time: string;
  producer: string;
  data: Record<string, any>;
}
