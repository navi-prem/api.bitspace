import express, { Express, Response } from "express"
import dotenv from "dotenv"
import cors from 'cors'
import serverless from "serverless-http"
import cookieParser from "cookie-parser"
import { Auth, Waitlist, User } from "./routes"

dotenv.config()

const app: Express = express()
const port: string = process.env.PORT || '3000'

const allowedOrigins = ['https://bitspace.org.in'];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 202,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

// routes
app.use(Waitlist.BASE_ROUTE, Waitlist.router)
app.use(User.BASE_ROUTE, User.router)
app.use(Auth.BASE_ROUTE, Auth.router)

app.get("/gg", (_, res: Response) => {
    return res.json({ statusCode: 200, body: { message: process.env.TEST_MSG || "Hello world!" } })
})

app.listen(port, () => {
   console.log(`[server]: http://localhost:${port}`)
})

// export const handler = serverless(app)
