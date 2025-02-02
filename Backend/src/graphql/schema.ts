import "reflect-metadata";
import { buildSchema } from "type-graphql";
import SignupResolver from "./resolvers/user/signup.mutation";
import SigninResolver from "./resolvers/user/signin.mutation";
import UserResolver from "./resolvers/user/user.query";
import UsersResolver from "./resolvers/user/users.query";
import { CreateEventResolver } from "./resolvers/event/createEvent.mutation";
import { UpdateEventResolver } from "./resolvers/event/updateEvent.mutation";
import { DeleteEventResolver } from "./resolvers/event/deleteEvent.mutation";
import { GetEventsResolver } from "./resolvers/event/getEvents.query";
import { DeleteEventsResolver } from "./resolvers/event/deleteEvents.mutation";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [SignupResolver, SigninResolver, UserResolver, UsersResolver, CreateEventResolver, UpdateEventResolver, DeleteEventResolver, DeleteEventsResolver, GetEventsResolver],
  });
};
