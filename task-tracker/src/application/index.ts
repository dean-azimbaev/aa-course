import { Provider } from '@nestjs/common';

import { TaskCommandHandlers, TaskInteractor } from './task';
import { AuthInteractor } from './auth';
import { AuthGuard } from './auth';

export const Application: Provider[] = [
  TaskInteractor,
  AuthInteractor,
  AuthGuard,
  ...TaskCommandHandlers,
];

export * from './task';
export * from './auth';

export { AuthGuard };
