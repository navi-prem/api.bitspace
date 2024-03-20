import { z } from "zod"

const timelineSchema = z.object({
    title: z.string({ required_error: "Title is required." }).max(25),
    content: z.array(z.string(), { required_error: "Content is required." }).min(1),
    date: z.coerce.date({ required_error: "Date for timeline is required." }),
    is_deleted: z.boolean().default(false)
}).strict()

export default timelineSchema
