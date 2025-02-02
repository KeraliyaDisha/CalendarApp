import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";

@Resolver()
export class DeleteEventsResolver {

    @Mutation(() => String)
    async deleteEvents(
    ) { 
        if (await prisma.event.deleteMany()) { 
            return "Events deleted"
        }
        throw new Error("Unable to delete events")
    }
}