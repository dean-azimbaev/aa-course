import * as Joi from 'joi';

export const kafkaConfigSchema = {
  KAFKA_CLUSTER: Joi.string().required(),
};
