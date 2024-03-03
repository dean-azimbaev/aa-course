import { Controller, Post } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  @Post()
  create() {
    
  }
}
