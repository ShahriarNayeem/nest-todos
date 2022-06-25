import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoSeeder implements Seeder {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async seed(): Promise<any> {
    const todos = DataFactory.createForClass(Todo).generate(100);

    // Insert into the database.
    return this.todoModel.insertMany(todos);
  }

  async drop(): Promise<any> {
    return this.todoModel.deleteMany({});
  }
}
