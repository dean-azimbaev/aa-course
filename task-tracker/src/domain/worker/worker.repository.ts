import { Worker } from './worker';

export interface WorkerRepository {
  findMostFreeWorker(): Promise<Worker>;
}
