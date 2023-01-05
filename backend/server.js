import express from "express"
import dotenv from "dotenv"
import colors from "colors"

// dotenv
dotenv.config()

// init server
const app = express()

// db

// allowed to send json data from frontend to the server
app.use(express.json())

// middleware

// routes

// init server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `The server is in ${process.env.PROJECT_TYPE} mode and running on PORT ${PORT}`
      .yellow.bold
  )
})
