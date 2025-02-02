import { ObjectType, Field, ID } from "type-graphql";
import { Event } from "./Event";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field(() => [Event], { nullable: true })
  events?: Event[];
}

@ObjectType()
export class Token {
  @Field()
  token!: string;
}