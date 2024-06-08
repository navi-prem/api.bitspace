import express, { Request, Response, NextFunction, Router } from "express"
import { signIn } from "../controllers"

const BASE_ROUTE: string = '/auth'
const router: Router = express.Router()

router.get('/sign-in', signIn)

router.use(async (err: Error, _: Request, res: Response, __: NextFunction) => {
    return res.status(500).json({ statusCode: 500, body: { err } })
})

export default { BASE_ROUTE, router }
