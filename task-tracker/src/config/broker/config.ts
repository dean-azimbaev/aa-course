import { kafkaConfig } from './kafka';

export const brokerConfig = () => ({
  broker: {
    ...kafkaConfig(),
  },
});
