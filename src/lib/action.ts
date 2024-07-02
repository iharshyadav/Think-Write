"use server"
import { HISTORY } from "@/app/dashboard/history/page";
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
  
    const HistoryList = await AISchemadetails.find({
     user
    })
  
    if(!HistoryList){
      console.log("user not found")
    }
  
    // console.log(HistoryList)

    return HistoryList;

}

export const countWords =async () =>{

  try {

   await connectToDB();

   const users = await currentUser()

   
   const user = users?.emailAddresses[0].emailAddress;
  //  console.log(user)

   let total : number = 0;
   const words:HISTORY[] = await AISchemadetails.find({
    user
   })

  //  const { aiResponse } : any= words;

  words.forEach((word) => {
    if (word.aiResponse) {
      // console.log(word.aiResponse.length);
      total += word.aiResponse.length;
    }
  });
  
  //  console.log(total)
   return total;
  } catch (error) {
   console.log(error)
  }
 }