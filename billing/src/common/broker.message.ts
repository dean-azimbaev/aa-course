export interface BrokerMessage<TData = Record<string, any>> {
  event_id: string;
  event_version: number;
  event_name: string;
  event_time: string;
  producer: string;
  data: TData;
}
