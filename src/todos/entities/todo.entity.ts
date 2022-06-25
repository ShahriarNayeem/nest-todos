import { ObjectType, Field, ID, GraphQLTimestamp } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema()
@ObjectType({ description: 'Todo entity' })
export class Todo {
  @Field(() => ID, { description: 'Todo Id' })
  _id: string;

  @Field({ description: 'Todo title' })
  @Prop({ type: String, default: '' })
  @Factory((faker) => faker.lorem.words(3))
  title: string;

  @Field({ description: 'Todo description' })
  @Prop({ type: String, default: '' })
  @Factory((faker) => faker.lorem.paragraph())
  description: string;

  @Field(() => Boolean, { description: 'Todo status' })
  @Prop({
    default(): boolean {
      return false;
    },
    type: Boolean,
  })
  isFinished: boolean;

  @Field(() => GraphQLTimestamp, { description: 'Todo created date' })
  @Prop({
    default(): number {
      return Date.now();
    },
    type: Date,
  })
  createdAt: Date;

  @Field(() => GraphQLTimestamp, {
    description: 'Todo finished date',
    nullable: true,
  })
  @Prop({ default: null, type: Date })
  finishedAt: Date | null;
}

export type TodoDocument = Todo & Document;

export const TodoSchema = SchemaFactory.createForClass(Todo);
