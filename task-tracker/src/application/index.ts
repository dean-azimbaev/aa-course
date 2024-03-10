import { Provider } from '@nestjs/common';

import { TaskCommandHandlers, TaskInteractor } from './task';
import { AuthInteractor } from './auth';

export const Application: Provider[] = [
  TaskInteractor,
  AuthInteractor,
  ...TaskCommandHandlers,
];

export * from './task';
export * from './auth';
