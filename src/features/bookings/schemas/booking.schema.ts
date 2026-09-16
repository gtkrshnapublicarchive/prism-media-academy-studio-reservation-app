import { z } from "zod";

export const CreateBookingSchema = z.object({
  studioId: z.string().min(1, "Studio selection is required"),
  gearKitId: z.string().optional().nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid start time"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid end time"),
  projectTitle: z.string().min(3, "Project title must be at least 3 characters").max(120),
  crewSize: z.coerce.number().int().min(1, "Crew size must be at least 1").max(6, "Maximum crew size is 6"),
  agreementSigned: z.boolean().refine((val) => val === true, {
    message: "You must accept responsibility for equipment and late return policies.",
  }),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
