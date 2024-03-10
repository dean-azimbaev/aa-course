import { Provider } from '@nestjs/common';

import { Persistence } from './persistence';

export const Adapters: Provider[] = [...Persistence];
