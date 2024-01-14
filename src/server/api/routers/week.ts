import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const weekRouter = createTRPCRouter({
  getLatestWeek: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUserId;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const latestWeek = await ctx.prisma.week.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        days: {
          include: {
            tasks: true,
          },
        },
      },
    });

    const day = await ctx.prisma.day.findFirst({
      where: {
        weekId: latestWeek.id,
        name: getDayName(currentDay),
      },
      include: {
        tasks: true,
      },
    });

    return {
      week: latestWeek,
      day,
    };
  }),
});

function getDayName(dayIndex: number) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}
