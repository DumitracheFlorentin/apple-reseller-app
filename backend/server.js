import express from "express"
import dotenv from "dotenv"
import colors from "colors"

import databaseConnection from "./database.js"

import userRoutes from "./routes/users.js"

// dotenv
dotenv.config()

// init server
const app = express()

// db
await databaseConnection()

// allowed to send json data from frontend to the server
app.use(express.json())

// middleware

// routes
app.use("/api/v1/users", userRoutes)

// init port
const PORT = process.env.PORT || 5000

// init server
app.listen(PORT, () => {
  console.log(
    `The server is in ${process.env.NODE_ENV} mode and running on PORT ${PORT}`
      .yellow.bold
  )
})
