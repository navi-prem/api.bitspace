import express, { Router } from "express"
import { addTimeline, deleteTimeline, getTimeline, updateTimeline } from "../controllers"

const BASE_ROUTE: string = '/timeline'
const router: Router = express.Router()

router.get('/', getTimeline)

// router.post('/', addTimeline)
// router.put('/', updateTimeline)
// router.delete('/', deleteTimeline)

export default { BASE_ROUTE, router }
