import mongoose from 'mongoose';

export const connectToDB = async () => {
   try {
    // console.log(process.env.DATABASE_URL!);
    const connectInstance = await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log(`connected to database at port : ${connectInstance.connection.port}`)
   } catch (error:any) {
    console.log(error)
   }

}