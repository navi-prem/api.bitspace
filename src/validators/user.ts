import { z } from 'zod'

const userSchema  = z.object({
    github_id: z.string(),
    username: z.string().default(""),
    is_banned: z.boolean().default(false),
    title: z.string().max(64).default(""),
    created_at: z.string().datetime().optional(),
    discord_id: z.string().optional(),
    strike: z.number().default(0),
    points: z.number().default(0),
    notify: z.boolean().default(false),
    is_super_mod: z.boolean().default(false)
})
