import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Event } from "../../../models/Event";
import { MyContext } from "../../../types/context";

@Resolver()
export class CreateEventResolver {
    @Mutation(() => Event)
    async createEvent(
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("start") start: Date,
        @Arg("end") end: Date,
        @Arg("userId") userId: string,
        @Ctx() ctx: MyContext
    ) {
        if (!ctx.userId) {
            throw new Error("Not authenticated");
        }

        // Ensure user exists before creating an event
        const existingUser = await prisma.user.findUnique({
            where: { id: ctx.userId }
        });

        if (!existingUser) {
            throw new Error("User not found");
        }

        // Create the event and include user details
        const event = await prisma.event.create({
            data: {
                title,
                description,
                start,
                end,
                user: {
                    connect: { id: userId }
                }
            },
            include: { user: true } // Ensure user is fetched to avoid null error
        });

        // Emit event to all connected clients
        ctx.io.emit("newEvent", event);

        return event;
    }
}
