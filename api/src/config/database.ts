import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect: any = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/shipments"
    ); //TODO
    console.log(
      `MonogoDB connected: ${connect.connection.host} ` //.cyan.underline TODO
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectDB;
