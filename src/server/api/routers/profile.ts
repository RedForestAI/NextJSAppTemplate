
import { z } from "zod";
import { createTRPCRouter, privateProcedure} from "~/server/api/trpc";
import { Role } from "@prisma/client";

export const profileRouter = createTRPCRouter({
  updateProfile: privateProcedure
  .input(
    z.object({
      profileId: z.string(),
      name: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      role: z.enum([Role.TEACHER, Role.STUDENT, Role.ADMIN, Role.PARENT, Role.RESEARCHER]).optional(),
      avatarUrl: z.string().optional(),
      avatarUrlUpdatedAt: z.iso.datetime().optional(),
      timeZone: z.string().optional(),
      language: z.string().optional(),
      coinCounter: z.number().optional(),
      characterProps: z.record(z.string(), z.any()).optional(),
      level: z.number().optional(),
      exp: z.number().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { profileId, ...fieldsToUpdate } = input;

    // Filter out undefined fields (only update provided ones)
    const data = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(([_, v]) => v !== undefined)
    );

    // Update only provided fields
    return await ctx.db.profile.update({
      where: { id: profileId },
      data,
    });
  }),

  getMany: privateProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {

      // Get all profiles for a course, first by getting all the enrollments
      const enrollments = await ctx.db.courseEnrollment.findMany({
        where: { courseId: input.courseId },
      });

      // Get all the profiles for the enrollments
      const profileIds = enrollments.map((enrollment) => enrollment.studentId);
      return await ctx.db.profile.findMany({
        where: { id: { in: profileIds } },
      });
    }),
})