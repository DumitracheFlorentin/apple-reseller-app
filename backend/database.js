import mongoose from "mongoose"

const databaseConnection = async () => {
  mongoose.set("strictQuery", false)
  return mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }, () => {
    console.log("Connected to MongoDB".cyan.bold)
  })
}

export default databaseConnection