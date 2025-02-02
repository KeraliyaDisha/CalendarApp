import { Resolver, Query, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { User } from "../../../models/User";
import { MyContext } from "../../../types/context";

@Resolver()
export default class UserResolver {
    @Query(() => User, { nullable: true })
    async user(@Ctx() ctx: MyContext) {
        if (!ctx.userId) {
            throw new Error("Not authenticated");
        }
        const user = await prisma.user.findUnique({
            where: { id: ctx.userId },
            include: {
                events: true,  // Include events to match the expected return type
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}

//om this code is hacked 