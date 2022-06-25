import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  isFinished: boolean;
}
