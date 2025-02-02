"use client";

import "./globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";

// Create a Socket Context
export const SocketContext = createContext<Socket | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to Socket.io server
    const newSocket = io("http://localhost:4000"); // Adjust URL if deployed
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Create an HTTP link for GraphQL API
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql", // Adjust when deploying
  });

  // Add token from cookies to the headers
  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get("token");
    return {
      headers: {
        ...headers,
        Authorization: token ? `${token}` : "",
      },
    };
  });

  // Create Apollo Client with authLink and httpLink
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <body>
        <SocketContext.Provider value={socket}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </SocketContext.Provider>
      </body>
    </html>
  );
}
