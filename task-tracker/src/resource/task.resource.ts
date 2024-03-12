import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard, UserDecorator } from 'src/application';
import { TaskInteractor } from '../application/task';

class NewTaskDTO {
  title: string;
  description: string;
  jira_id: string;
}

@Controller('tasks')
export class TaskController {
  constructor(private tasks: TaskInteractor) {}

  @Post()
  @UseGuards(AuthGuard)
  new(@Body() { title, description, jira_id }: NewTaskDTO) {
    return this.tasks.new(title, description, jira_id);
  }

  @Post(':task_id/complete')
  @UseGuards(AuthGuard)
  complete(
    @Param('task_id') task_id: string,
    @UserDecorator('public_id') worker_id: string,
  ) {
    return this.tasks.complete(task_id, worker_id);
  }

  @Post(':task_id/reassing')
  @UseGuards(AuthGuard)
  reasign(
    @Param('task_id') task_id: string,
    @Body('worker_id') worker_id: string,
  ) {
    return this.tasks.reassign(task_id, worker_id);
  }

  @Post('shuffle')
  @UseGuards(AuthGuard)
  shuffle() {
    return this.tasks.shuffle();
  }
}
