"use server"
import { HISTORY } from "@/app/dashboard/history/page";
import { connectToDB } from "@/utils/database";
import AISchemadetails from "@/utils/schema";
import SaveSubscriptionDetails from "@/utils/subscriptionSchema";
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

 export const saveSubcription=async(paymentId:string)=>{

  try {
    const user = await currentUser(); 

  const users = user?.emailAddresses[0].emailAddress;

  const findUser = await SaveSubscriptionDetails.findOne({
    email : users
  })

  if(findUser) {
    await SaveSubscriptionDetails.updateOne({ email: users }, { $set: { updatedAt: new Date() } });
  }else{
    const result = await SaveSubscriptionDetails.create({
      email: users,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: new Date(),
    });
   console.log(result);
  }
    return true;
  } catch (error) {
    return false;
  }
}

export const checkUserSubscription = async () =>{
   try {
    const user = await currentUser();
    
    const email = user?.emailAddresses[0].emailAddress;

    if(!user){
      return;
    }

    const findUser = await SaveSubscriptionDetails.findOne({
      email
    })

    const checkPlan = new Date(findUser.updatedAt).getTime();

    const checkActivePlan = new Date().getTime() - checkPlan;

    // console.log(checkActivePlan)

    if(checkActivePlan >= 2629440000){
      return false;
    }

    return true;

   } catch (error) {
    console.log(error)
   }
}