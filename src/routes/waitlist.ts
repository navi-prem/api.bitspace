import express, { Router } from "express"
import { addToWaitlist } from "../controllers"

const BASE_ROUTE: string = '/waitlist'
const router: Router = express.Router()

router.post('/', addToWaitlist)

export default { BASE_ROUTE, router }
