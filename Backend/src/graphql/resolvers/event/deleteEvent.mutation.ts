import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteEventResolver {
    @Mutation(() => String)
    async deleteEvent(
        @Arg("id") id: string,
        @Ctx() ctx: MyContext
    ) { 
        if (!ctx.userId) {
            throw new Error("Not authenticated");
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id }
        });

        if (!existingEvent) {
            throw new Error("Event not found");
        }

        if (existingEvent.userId !== ctx.userId) {
            throw new Error("You do not have permission to delete this event");
        }

        await prisma.event.delete({ where: { id } });

        // Emit event deletion to all connected clients
        ctx.io.emit("deleteEvent", { id });

        return "Event deleted";
    }
}
