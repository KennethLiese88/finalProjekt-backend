import mongoose from "mongoose";

mongoose.connection.on("error", (error) => {
  console.log("DB error after initial connection", error.message);
});

const atlasConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE,
    });
    console.log(`Connected to MongoDB!`);
  } catch (error) {
    console.error(`Connection error`);
  }
};

export default atlasConnect;
