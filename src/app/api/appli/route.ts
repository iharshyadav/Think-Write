import { connectToDB } from "@/utils/database";
import AISchemadetails from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server"


export async function POST (req:NextRequest,res:NextResponse) {
    try {
        
        const body = await new Response(req.body).json();        
        // console.log(body)
        const { input1 ,aiResponse, input2 , slug , user  } = body;
        await connectToDB();


    const dbAI = await AISchemadetails.create({
        input1,
        input2,
        aiResponse,
        slug,
        user
      });

    return NextResponse.json({
        dbAI
    })
   } catch (error) {
     return NextResponse.json({
        msg:"error something"
     })
   }
}