import { totp } from "otplib";
import { authenticator } from "otplib";
import { sendMessage } from "@/app/api/services/nodemailer/send_message";
import prisma from "@/prisma/connections";

export async function generateSecret() {
  totp.options = { digits: 6 };
  const secret = authenticator.generateSecret();
  const code = totp.generate(secret);
  return code;
}

export async function enable2FA(userId: string, email: string) {
  try {
    // const isValid = totp.check(token, secret);
    // await prisma.session.create({
    //   data: {
    //     userId: userId,
    //     otpEnabled: true,
    //     expires: new Date(Date.now() + 720 * 3600 * 1000),
    //   },
    // });
    return { success: true, message: "2FA enabled successfully" };
  } catch (error) {
    console.log(error);
    // Handle error (e.g., show a message to the user)
    return { success: false, message: "Failed to generate OTP" };
  }
}
