import { Request, Response } from 'express'
import { pool } from '../../db'
import { User } from '../queries'
import { fromZodError } from 'zod-validation-error'
import { userSchema } from '../validators'

export const getUser = async (req: Request, res: Response) => {
    const { github_id } = req.query
    if (!github_id) return res.status(417).json({ statusCode: 417, body: { message: "ID not provided." } })

    try {
        const { rows: user } = await pool.query(User.getUser, [github_id])
        return res.status(200).json({ statusCode: 200, body: { message: "User fetched successfully." , user } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Failed to fetch user data.", err } })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { github_id, title, discord_id, username } = req.body
    const body = { title, discord_id, username }

    const zod = userSchema.safeParse(body)

    if (!github_id) return res.status(417).json({ statusCode: 417, body: { message: "ID not provided." } })
    if (!zod.success) return res.status(417).json({ statusCode: 417, body: { message: "Zod error.", error: fromZodError(zod.error) } })

    try {
        await pool.query(User.updateUser, [github_id, body.username, body.title, body.discord_id])
        return res.status(200).json({ statusCode: 200, body: { message: "User data updated successfully." } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Failed to update user data.", err } })
    }
}
