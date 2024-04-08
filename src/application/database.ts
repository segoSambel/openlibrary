import {PrismaClient} from "@prisma/client";
import {logger} from "./logging";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "error",
    }
  ],
});

prismaClient.$on("query", (event) => {
  logger.info(event);
})

prismaClient.$on("info", (event) => {
  logger.info(event);
})

prismaClient.$on("warn", (event) => {
  logger.warn(event);
})

prismaClient.$on("error", (event) => {
  logger.error(event);
})
