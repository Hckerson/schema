"use server";
import prisma from "@/prisma/connections";


export const deleteUser = async (id: string) => {
  try {
    const deletedUSer = await prisma.user.delete({where : {id : id}})
    return deletedUSer;
  } catch (error) {
    console.log(error);
  }
};

