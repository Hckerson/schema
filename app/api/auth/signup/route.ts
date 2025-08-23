"use server";
import prisma from "@/prisma/connections";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  // const email = params.get('email')
  // if (email == null){
  //   return Response.json({message: 'failed', status : 400})
  // }

  // const user = await prisma.user.findUnique({where : {email : email}})
  // if (user == null){
  //   return Response.json({message: 'not found', status : 400})
  // }
  return Response.json({message: 'found', status : 200})
}
