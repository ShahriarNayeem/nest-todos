import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field({ description: 'Todo title' })
  title: string;

  @Field({ description: 'Todo description' })
  description: string;
}
