import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongoose is connected!')
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}
export default connectDB;