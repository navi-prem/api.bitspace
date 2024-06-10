import express, { Request, Response, NextFunction, Router } from "express"
import { getUser, updateUser } from "../controllers"
import asyncMiddleware, { AuthMiddleware } from "../middlewares"

const BASE_ROUTE: string = '/u'
const router: Router = express.Router()

router.get('/', getUser)
router.put('/', asyncMiddleware(AuthMiddleware, 3, true), updateUser)

router.use(async (err: Error, _: Request, res: Response, __: NextFunction) => {
    return res.status(401).json({ statusCode: 401, body: { err } })
})

export default { BASE_ROUTE, router }
