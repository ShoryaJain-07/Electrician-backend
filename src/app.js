import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

import adminRouter from "./routes/admin.route.js"
import electricianRouter from "./routes/electrician.route.js"

app.use("/admin", adminRouter);
app.use("/electrician", electricianRouter);

export {app}