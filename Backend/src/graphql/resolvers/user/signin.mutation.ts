import { Resolver, Mutation, Arg } from "type-graphql";
import prisma from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Token } from "../../../models/User";

@Resolver()
export default class SigninResolver {
    @Mutation(() => Token)
    async signin(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<Token> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid credentials");
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        return { token };
    }
}

// //om this code is hacked 