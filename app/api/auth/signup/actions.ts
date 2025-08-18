"use server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/connections";
import { verifyMail } from "../verify/verify_email";

const SALT = 10;

export async function signUp(formData: {
  email: string;
  password: string;
  username: string;
  phone: string;
  dialCode: string;
}) {
  const hashedPassword = await bcrypt.hash(formData.password, SALT);
  const phoneNumber = `${formData.dialCode}${
    formData.phone.startsWith("0") ? formData.phone.slice(1) : formData.phone
  }`;
  const status = "unverified";
  const isLocal = true;

  try {
    const [client] = await prisma.user.createManyAndReturn({
      data: {
        email: formData.email,
        password: hashedPassword,
        username: formData.username,
        phone: phoneNumber,
        status: status,
        localStatus: isLocal,
      },
    });
    const { email: returnedEmail, id } = client;
    console.log(returnedEmail, id);
    const result = await verifyMail(returnedEmail, id);
    if (result?.status === 200) {
      return { message: "done", status: 200 };
    } else {
      return { message: "failed", status: 500 };
    }
  } catch (error) {
    console.error("Error registering user", error);
    return { message: "failed", status: 500 };
  }
}
