import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Event } from "../../../models/Event";
import { MyContext } from "../../../types/context";

@Resolver()
export class UpdateEventResolver {
    @Mutation(() => Event)
    async updateEvent(
        @Arg("id") id: string,
        @Ctx() ctx: MyContext,
        @Arg("title", { nullable: true }) title?: string,
        @Arg("description", { nullable: true }) description?: string,
        @Arg("start", { nullable: true }) start?: Date,
        @Arg("end", { nullable: true }) end?: Date
    ) {
        if (!ctx.userId) {
            throw new Error("Not authenticated");
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!existingEvent) {
            throw new Error("Event not found");
        }

        if (existingEvent.userId !== ctx.userId) {
            throw new Error("You do not have permission to edit this event");
        }

        if (start && end && start > end) {
            throw new Error("Start date cannot be later than end date.");
        }

        const updatedEventData = {
            title: title ?? existingEvent.title,
            description: description ?? existingEvent.description,
            start: start ?? existingEvent.start,
            end: end ?? existingEvent.end,
        };

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: updatedEventData,
            include: { user: true },
        });

        // Emit event update to all connected clients
        ctx.io.emit("updateEvent", updatedEvent);

        return updatedEvent;
    }
}
