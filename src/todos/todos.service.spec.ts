import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo, TodoSchema } from './entities/todo.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../helpers/mongoose.helper';

describe('TodosService', () => {
  let service: TodosService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: Todo.name,
            schema: TodoSchema,
          },
        ]),
      ],
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
