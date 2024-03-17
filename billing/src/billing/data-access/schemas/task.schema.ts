import { EntitySchema } from 'typeorm';

export class TaskDA {
  id: string;
  public_id: string;
  price: number;
  comment: string;
}

export const TaskSchema = new EntitySchema<TaskDA>({
  tableName: 'task',
  target: TaskDA,
  name: TaskDA.name,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    public_id: {
      type: 'uuid',
    },
    price: {
      type: 'int',
    },
    comment: {
      type: 'varchar',
      nullable: true,
    },
  },
});
