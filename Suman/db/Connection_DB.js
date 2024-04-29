import mongoose from "mongoose";

const URI = "mongodb+srv://Suman:suman1234@clustersuman.jfzugcc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSuman" ;

export const connectDB = async () => {
  try {
    await mongoose.connect(URI).then(() => console.log(`DataBase Connected Successfully`))
   
    // console.log(
    //   `Connection String: ${connections[0]._connectionString}\nHost: ${connections[0].host}, Port: ${connections[0].port} and Database Name: ${connections[0].name}`
    // );
  } catch (error) {
    console.log(`DataBase Connection failed`);
    throw error.message;
  }
};
