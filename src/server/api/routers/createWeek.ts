import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { start } from "repl";

export const createWeekRouter = createTRPCRouter({
  generateWeek: privateProcedure
    .input(
      z.object({
        weekStart: z.any(),
        readingAmount: z.number(),
        readingStart: z.number(),
        listeningAmount: z.number(),
        ListeningStart: z.number(),
        newAmount: z.number(),
        newStart: z.number(),
        nearReviewAmount: z.number(),
        farReviewAmount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const startDate = new Date(input.weekStart);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 5);

      const week = await ctx.prisma.week.create({
        data: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          userId: ctx.currentUserId,
          weekDetails: {
            create: {
              readingAmount: input.readingAmount,
              readingStart: input.readingStart,
              listeningAmount: input.listeningAmount,
              ListeningStart: input.ListeningStart,
              newAmount: input.newAmount,
              newStart: input.newStart,
              nearReviewAmount: input.nearReviewAmount,
              farReviewAmount: input.farReviewAmount,
            },
          },
        },
      });

      let dayNo = 0;
      const allFarReview = input.newStart - input.nearReviewAmount;
      const needFarReview = allFarReview >= input.farReviewAmount;
      const reviewAmount = Math.min(
        Math.floor(allFarReview / 6),
        input.farReviewAmount
      );

      for (
        let day = new Date(startDate);
        day <= endDate;
        day.setDate(day.getDate() + 1)
      ) {
        const beginningNew = input.newStart + input.newAmount * dayNo;
        let dayTasks = [
          {
            name: "الحفظ الجديد",
            from: beginningNew,
            to: input.newStart + input.newAmount * (dayNo + 1) - 1,
          },
          {
            name: "التعاهد القريب",
            from: Math.max(beginningNew - input.nearReviewAmount, 0),
            to: Math.max(beginningNew - 1, 0),
          },
          {
            name: "التعاهد البعيد",
            from: needFarReview ? reviewAmount * dayNo + 1 : 0,
            to: needFarReview ? reviewAmount * (dayNo + 1) : 0,
          },
          {
            name: "التحضير الاسبوعي",
            from: input.newStart + input.newAmount * 6,
            to: input.newStart + input.newAmount * 6 * 2,
          },
          {
            name: "التحضير الليلي",
            from: beginningNew + 1,
            to: input.newStart + input.newAmount * (dayNo + 1),
          },
          {
            name: "التحضير القبلي",
            from: beginningNew,
            to: input.newStart + input.newAmount * (dayNo + 1) - 1,
          },
          {
            name: "القراءة المستمرة",
            from: input.readingStart + input.readingAmount * dayNo,
            to: input.readingStart + input.readingAmount * (dayNo + 1),
          },
          {
            name: "الاستماع المنهجي",
            from: input.ListeningStart + input.listeningAmount * dayNo,
            to: input.ListeningStart + input.listeningAmount * (dayNo + 1),
          },
        ];

        // Create the day with tasks
        await ctx.prisma.day.create({
          data: {
            name: getDayName(day.getDay()) || "",
            weekId: week.id,
            tasks: {
              createMany: {
                data: dayTasks,
              },
            },
          },
        });

        dayNo++;
      }

      // Handle success or continue with other operations
      return {
        code: 200,
        message: "تم انشاء الجدول بنجاح",
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

function calculateWeekDates(weekStart: string): {
  startDate: Date;
  endDate: Date;
} {
  const startDate: Date = new Date(weekStart);
  const endDate: Date = new Date(startDate);
  endDate.setDate(startDate.getDate() + (6 - startDate.getDay()));
  return { startDate, endDate };
}

function getEndOfWeek(date: Date) {
  // Clone the input date to avoid modifying the original
  const lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday));
}
