import { Request, Response } from 'express'
import { pool } from '../../db'
import { Timeline } from '../queries'
import timelineSchema from '../validators/timeline'
import { fromZodError } from 'zod-validation-error'

export const getTimeline = async (_: Request, res: Response) => {

    try {
        const { rows: data } = await pool.query(Timeline.getTimeline)
        return res.status(200).json({ statusCode: 200, body: { message: "Timeline fetched successfully." , data } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Failed to fetch timeline.", err } })
    }
}

export const addTimeline = async (req: Request, res: Response) => {
    const { title, content, date } = req.body
    const body = { title, content, date }

    const zod = timelineSchema.safeParse(body)
    if (!zod.success) return res.status(417).json({ statusCode: 417, body: { message: "Zod error.", error: fromZodError(zod.error) } })

    try {
        const { rows } = await pool.query(Timeline.addTimeline, [body.title, body.content, body.date])
        return res.status(200).json({ statusCode: 200, body: { message: "Timeline created successfully.", ...rows[0] } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Failed to add timeline.", err } })
    }
}

export const updateTimeline = async (req: Request, res: Response) => {
    const { timeline_id, title, content, date } = req.body
    const body = { title, content, date }

    const zod = timelineSchema.safeParse(body)

    if (!timeline_id) return res.status(417).json({ statusCode: 417, body: { message: "ID not provided." } })
    if (!zod.success) return res.status(417).json({ statusCode: 417, body: { message: "Zod error.", error: fromZodError(zod.error) } })

    try {
        await pool.query(Timeline.updateTimeline, [body.title, body.content, body.date, timeline_id])
        return res.status(200).json({ statusCode: 200, body: { message: "Timeline updated successfully." } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Failed to update timeline.", err } })
    }
}

export const deleteTimeline = async (req: Request, res: Response) => {
    const { timeline_id } = req.body
    if (!timeline_id) return res.status(417).json({ statusCode: 417, body: { message: "ID not provided." } })

    try {
        await pool.query(Timeline.deleteTimeline, [timeline_id])
        return res.status(200).json({ statusCode: 200, body: { message: "Timeline deleted successfully." } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Failed to delete timeline.", err } })
    }
}
