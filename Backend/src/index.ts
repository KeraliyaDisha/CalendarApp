import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { createSchema } from "./graphql/schema";
import dotenv from "dotenv";
import "reflect-metadata";
import jwt from "jsonwebtoken";

dotenv.config();

const startServer = async () => {
    const app:any = express();
    const httpServer = createServer(app); 
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    const schema = await createSchema();

    const server = new ApolloServer({
        schema,
        introspection: true, 
        context: ({ req }) => {
            const token = req.headers.authorization || "";

            try {
                if (token) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
                    return { userId: (decodedToken as { userId: string }).userId, req, io };
                }
            } catch (err: any) {
                console.error("JWT verification failed:", err.message);
            }

            return { userId: null, req, io };
        },
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/graphql`);
    });
};

startServer();
