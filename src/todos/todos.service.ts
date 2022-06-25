import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo, TodoDocument } from './entities/todo.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoInput: CreateTodoInput) {
    try {
      return await this.todoModel.create(createTodoInput);
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(pageNumber: number) {
    const dataPerPage = 10;
    try {
      return await this.todoModel
        .find()
        .sort({
          createdAt: 'desc',
        })
        .limit(dataPerPage)
        .skip(pageNumber * dataPerPage)
        .lean();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: string) {
    try {
      return await this.todoModel.findById(id).lean();
    } catch (e) {
      throw new Error(e);
    }
  }

  update(id: string, updateTodoInput: UpdateTodoInput) {
    return this.todoModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateTodoInput,
          isFinished: updateTodoInput.isFinished,
          finishedAt: updateTodoInput.isFinished ? new Date() : null,
        },
      },
      {
        new: true,
        lean: true,
      },
    );
  }

  async remove(id: string) {
    try {
      return await this.todoModel.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
