import { z } from 'zod'

const waitlistUserSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, "Name must be atleast 3 characters.").max(25, "Name must be atmost 25 characters"),
    email: z.string({ required_error: "Email is required" }).email("Not a valid email")
}).strict()

export default waitlistUserSchema
