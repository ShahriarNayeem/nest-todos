import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo, {
    description: 'Create a new todo',
    name: 'create_a_todo',
  })
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return await this.todosService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'get_all_todos', description: 'Get all todos' })
  async findAll(@Args('pageNumber', { type: () => Int }) pageNumber: number) {
    return await this.todosService.findAll(pageNumber);
  }

  @Query(() => Todo, {
    name: 'get_a_single_todo',
    nullable: true,
    description: 'Get a single todo',
  })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.todosService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'update_a_todo', description: 'Update a todo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'delete_a_todo',
    nullable: true,
    description: 'Delete a todo',
  })
  removeTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todosService.remove(id);
  }
}
