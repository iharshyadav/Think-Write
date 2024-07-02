"use server"
import { connectToDB } from "@/utils/database";
import AISchemadetails from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";


export const findUser = async () => {

    const users = await currentUser();

    const user = users?.emailAddresses[0].emailAddress;

    // console.log(user)
  
    await connectToDB();
  
    if(user === undefined){
      return console.log("error to fetch user")
    }
  
    const id = "6683512a4803195ac318741d"
  
    const HistoryList = await AISchemadetails.find({
     user
    })
  
    if(!HistoryList){
      console.log("user not found")
    }
  
    // console.log(HistoryList)

    return HistoryList;

}