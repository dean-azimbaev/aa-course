import { Worker } from 'src/domain';

export class AddNewTask {
  constructor(
    public description: string,
    public worker: Worker,
  ) {}
}
