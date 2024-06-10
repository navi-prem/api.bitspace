import { z } from "zod"

const userSchema = z.object({
    title: z.string({ required_error: "Title is required." }).max(25),
    username: z.string({ required_error: "Username is required." }).min(3).max(15),
    discord_id: z.string({ required_error: "Discord ID is required." }).min(3).max(10),
}).strict()

export default userSchema
