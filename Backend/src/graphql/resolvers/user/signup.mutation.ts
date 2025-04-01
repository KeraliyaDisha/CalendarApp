import { Resolver, Mutation, Arg } from "type-graphql";
import prisma from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Token } from "../../../models/User";

@Resolver()
export default class SignupResolver {
  @Mutation(() => Token)
  async signup(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<Token> {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error(`The username '${email}' already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return { token };
  }
}
