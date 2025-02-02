import { ObjectType, Field, ID, GraphQLISODateTime} from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Event {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  start!: Date;

  @Field(() => GraphQLISODateTime)
  end!: Date;

  @Field(() => User)
  user!: User;

  @Field()
  userId!: string;
}