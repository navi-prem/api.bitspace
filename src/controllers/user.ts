import { Request, Response } from "express";
import { pool } from "../../db";
import { Users } from "../queries";

export const getUsers = async (_: Request, res: Response) => {
    try {
        const { rows: users } = await pool.query(Users.getUsers)
        return res.status(200).json({ statusCode: 200, body: { message: "Users retrieved successfully.", users } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "Users failed to retrieve.", err } })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const { rows: user } = await pool.query(Users.getUser, [id])
        return res.status(200).json({ statusCode: 200, body: { message: "User retrieved successfully.", user } })
    } catch (err) {
        return res.status(400).json({ statusCode: 400, body: { message: "User data failed to retrieve.", err } })
    }
}
