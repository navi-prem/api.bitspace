import { Request, Response } from 'express'
import axios from 'axios'
import { User } from '../queries'
import { pool } from '../../db'

export const signIn = async (req: Request, res: Response) => {
    const { code } = req.query
    const client_secret = process.env.GITHUB_CLIENT_SECRET || ''
    const client_id = process.env.GITHUB_CLIENT_ID || ''
    const param = "?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code

    try {
        const { data: { access_token } } = await axios.post("https://github.com/login/oauth/access_token" + param, {}, {
            headers: { Accept: 'application/json' }
        })
        if (access_token === undefined) return res.status(417).json({ statusCode: 417, message: 'Bad Verification Code.' });
        const { data: user } = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const { rows } = await pool.query(User.getUser, [user.id])
        if (rows.length === 0) await pool.query(User.createUser, [user.id, user.login]);
        return res.status(200).setHeader('Set-Cookie', `bs_token=${access_token}; HttpOnly`).json({ statusCode: 200, body: { user, message: "Authenticated." } });
    } catch (err) {
        return res.status(401).json({ statusCode: 401, body: { err, message: "Unauthorized." } })
    }
}
