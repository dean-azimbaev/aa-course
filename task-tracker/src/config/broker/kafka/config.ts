import { KafkaConfig } from 'kafkajs';

type Kafka = {
  kafka: KafkaConfig;
};

export const kafkaConfig = (): Kafka => ({
  kafka: {
    brokers: process.env.KAFKA_CLUSTER.split(','),
    clientId: 'trask-tracker'
  },
});
