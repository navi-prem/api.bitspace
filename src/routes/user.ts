import express, { Request, Response, NextFunction, Router } from "express"
import asyncMiddleware, { AuthMiddleware } from "../middlewares"
import { getUsers, getUser } from "../controllers"

const BASE_ROUTE: string = '/users'
const router: Router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)

router.use(async (err: Error, _: Request, res: Response, __: NextFunction) => {
    return res.status(500).json({ statusCode: 500, body: { err } })
})

export default { BASE_ROUTE, router }
