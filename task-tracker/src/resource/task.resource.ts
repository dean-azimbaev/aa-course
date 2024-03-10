import { Body, Controller, Param, Post } from '@nestjs/common';

import { TaskInteractor } from '../application/task';

class NewTaskDTO {
  description: string;
}
@Controller('tasks')
export class TaskController {
  constructor(private tasks: TaskInteractor) {}

  @Post()
  new(@Body() { description }: NewTaskDTO) {
    return this.tasks.new(description);
  }

  @Post(':task_id/reassing')
  reasign(@Param('task_id') task_id: string) {
    return this.tasks.reassign(task_id);
  }
}
