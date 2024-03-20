import express, { Request, Response, NextFunction, Router } from "express"
import { addTimeline, deleteTimeline, getTimeline, updateTimeline } from "../controllers"
import asyncMiddleware, { AuthMiddleware } from "../middlewares"

const BASE_ROUTE: string = '/timeline'
const router: Router = express.Router()

router.get('/', getTimeline)
router.post('/', asyncMiddleware(AuthMiddleware, 3), addTimeline)
router.put('/', asyncMiddleware(AuthMiddleware, 3), updateTimeline)
router.delete('/', asyncMiddleware(AuthMiddleware, 3), deleteTimeline)

router.use(async (err: Error, _: Request, res: Response, __: NextFunction) => {
    return res.status(500).json({ statusCode: 500, body: { err } })
})

export default { BASE_ROUTE, router }
