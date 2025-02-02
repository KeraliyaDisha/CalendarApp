import { Resolver, Query, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Event } from "../../../models/Event";
import { MyContext } from "../../../types/context";

@Resolver()
export class GetEventsResolver {

    @Query(() => [Event])
    async getEvents(
        @Ctx() ctx: MyContext
    ) {
        if (!ctx.userId) {
            throw new Error("Not authenticated");
        }
        const events = await prisma.event.findMany({ where: { userId: ctx.userId } });
        return events;
    }
}