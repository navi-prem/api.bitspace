import { Request, Response } from 'express'
import { pool } from '../../db'
import { newUser } from '../queries'
import waitlistUserSchema from '../validators/waitlist'
import { fromZodError } from 'zod-validation-error'

export const addToWaitlist = async (req: Request, res: Response) => {
    const zod = waitlistUserSchema.safeParse(req.body)
    if (!zod.success) return res.status(417).json({ statusCode: 417, body: { message: "Zod error.", error: fromZodError(zod.error) } })

    const { email, name } = req.body

    const client = await pool.connect()
    try {
        const data = await client.query(newUser, [email, name])
        client.release()
        return res.status(200).json({ statusCode: 200, body: { message: "User added to waitlist successfully." , data } })
    } catch (err) {
        client.release()
        return res.status(500).json({ statusCode: 500, body: { message: "Internal Server Error.", err } })
    }
}
