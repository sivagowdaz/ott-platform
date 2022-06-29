const express = require("express")
const app = express()
const userRouter = require("./routes/auth")
const contentRouter = require("./routes/content")
require("dotenv").config()
const cors = require('cors')

app.use(cors({
    origin:["http://localhost:4000", "http://localhost:3000"]
}))

app.use(express.json())



// ROUTES
app.use("/api/auth", userRouter)
app.use("/api/content", contentRouter)



const start = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`The server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error.message)
    }
}

start()