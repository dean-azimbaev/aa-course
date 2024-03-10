import { Provider } from '@nestjs/common';

import { TaskCommandHandlers, TaskInteractor } from './task';

export const Application: Provider[] = [TaskInteractor, ...TaskCommandHandlers];

export * from './task';
export * from './resource';
