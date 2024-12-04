import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // database  name from constants file

const connectDB = async () => {
  try {
    // connecting data base 
    // [ MONGODB_URI ] database url ,this url form mogodb compasss or online mongoodb swerver website\
    // connectionInstance means response from databse 
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb connected !! DB HOST:${connectionInstance.connection.host} 😀 ✅`
    );
  } catch (error) {
    console.log("MONGODB cannection Failed ❗", error);
    process.exit(1);
  }
};

export default connectDB;
