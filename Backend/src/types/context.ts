import { Request } from "express";

export interface MyContext {
    req: Request;
    userId: string;
    io: any;
}
