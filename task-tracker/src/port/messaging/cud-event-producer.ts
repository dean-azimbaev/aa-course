import { KafkaConfig } from 'kafkajs';

export class CUDEventProducer {
  constructor(private kafka: KafkaConfig) {}
}
