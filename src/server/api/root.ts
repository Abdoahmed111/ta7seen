import { createTRPCRouter } from "@/server/api/trpc";
import { createWeekRouter } from "./routers/createWeek";
import { weekRouter } from "./routers/week";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  createWeek: createWeekRouter,
  week: weekRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
