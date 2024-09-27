import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-yoga";

export interface IContext {
  prisma: PrismaClient;
  pubsub: PubSub;
  request?: any;
}
