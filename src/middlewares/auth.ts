import { Request, Response, NextFunction } from "express";
import axios from 'axios'
import dotenv from 'dotenv'
import { pool } from "../../db";
import { Auth } from "../queries";

dotenv.config()

const AuthMiddleware: (req: Request, res: Response, next: NextFunction, rank: number, allowSelf: boolean) => Promise<void> = async (req: Request, res: Response, next: NextFunction, rank: number, allowSelf: boolean = false) => {
    const token = req.cookies["bs_token"]

    try {
        const { data } = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        req.body.g_id = data.id
        if (allowSelf && req.body.g_id == req.body.github_id) next()

        try {
            const id = data?.id || ""
            const { rows } = await pool.query(Auth.getUserRank, [id])

            if (rows[0].min > rank)
                throw new Error('User not authorized to perform this action.')
        } catch (err) {
            next('User not authorized to perform this action.')
        }
        next()
    } catch (err) {
        next(err)
    }
}

export default AuthMiddleware
