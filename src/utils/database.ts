"use server"

import mongoose from 'mongoose';

export const connectToDB = async () => {
   try {
   //  console.log(process.env.NEXT_PUBLIC_DATABASE_URL as string);
    const connectInstance = await mongoose.connect(process.env.DATABASE_URL as string);
    console.log(`connected to database at port : ${connectInstance.connection.port}`)
   } catch (error:any) {
    console.log(error)
   }

}