import { EntitySchema } from 'typeorm';

export class TaskDA {
  id: string;
  public_id: string;
  price: number;
  title: string;
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
      unique: true,
    },
    price: {
      type: 'int',
      default: () => 'floor(random() * 20 + 1)',
    },
    title: {
      type: 'varchar',
      nullable: true,
    },
  },
});
