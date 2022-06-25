import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSeeder } from './todos/todo.seeder';
import { TodoSchema, Todo } from './todos/entities/todo.entity';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nafiz:Abc123@cluster0.qliu5.mongodb.net/todos?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
}).run([TodoSeeder]);
