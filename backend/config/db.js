import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function dbConnect() {
    await mongoose.connect(process.env.MONGODB_URI).then((mongoose) => console.log('DB Connected'))
}

export default dbConnect;
