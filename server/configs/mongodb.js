import mongoose from "mongoose"

// Connect to the mongoDb database
const connectDB = async () =>{
    mongoose.connection.on('connected', ()=> console.log(' Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/ai skill development tracker`)
}

export default connectDB
