import { NewTaskAdded } from './new-task-added.event';
import { TaskReassigned } from './task-reassigned.event';
import { TaskCompleted } from './task-completed.event';

export const TaskDomainEvents = [NewTaskAdded, TaskReassigned, TaskCompleted];

export { NewTaskAdded, TaskReassigned, TaskCompleted };
