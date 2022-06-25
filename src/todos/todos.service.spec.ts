import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo, TodoSchema } from './entities/todo.entity';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';

describe('TodosService', () => {
  let service: TodosService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let todoModel: Model<Todo>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    todoModel = mongoConnection.model(Todo.name, TodoSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getConnectionToken('DatabaseConnection'),
          useValue: mongoConnection,
        },
        { provide: getModelToken(Todo.name), useValue: todoModel },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
