import { Task } from './task.entity';

export interface TaskRepository {
  findOne(id: string): Promise<Task>;
  save(task: Task): Promise<Task>;
  nextIdentity(): Promise<string>;
}
