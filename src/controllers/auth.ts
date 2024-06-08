import { Request, Response } from 'express'
import axios from 'axios'

export const signIn = async (req: Request, res: Response) => {
    const { code } = req.query
    const client_secret = process.env.GITHUB_CLIENT_SECRET || ''
    const client_id = process.env.GITHUB_CLIENT_ID || ''
    const param = "?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code

    try {
        const { data } = await axios.post("https://github.com/login/oauth/access_token" + param, {}, {
            headers: { Accept: 'application/json' }
        })

        if (data.access_token === undefined) return res.status(417).json({ statusCode: 417, message: 'Bad Verification Code.' });
        return res.status(200).setHeader('Set-Cookie', `bs_token=${data.access_token}; HttpOnly`).json({ statusCode: 200, body: { message: "Authenticated." } });
    } catch (err) {
        return res.status(401).json({ statusCode: 401, body: { message: "Unauthorized." } })
    }
}
