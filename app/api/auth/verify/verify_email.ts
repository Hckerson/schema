import "dotenv/config";
import { deleteUser } from "@/lib/actions/action";
import { sendMessages } from "../../services/nodemailer/send_message";

export async function verifyMail(email: string, id: string) {
  if (!email || typeof email !== "string") {
    console.log("Invalid email provided");
    return;
  }

  const url = `http://localhost:3000/verify/${email}/${id}`;

  try {
    await sendMessages(
      email,
      "Verify Your Email Address",
      "Please verify your email address to continue",
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 24px;">Welcome to our platform! Finadvise</h1>
              <p style="color: #6b7280; margin-top: 10px;">Thank you for signing up with us</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
              <p style="margin: 0 0 20px 0;">To complete your registration and verify your email address, please click the button below:</p>
              
              <div style="text-align: center;">
                <a href="${url}" 
                   style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold; transition: background-color 0.3s;">
                  Verify Email Address
                </a>
              </div>
            </div>
            
            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 0;">If you didn't create an account, you can safely ignore this email.</p>
              <p style="margin: 10px 0 0 0;">This link will expire in 24 hours.</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
              <p style="margin: 5px 0 0 0; word-break: break-all;">${url}</p>
            </div>
          </div>
        </body>
      </html>
      `
    );
    return { message: "done", status: 200 };
  } catch (error) {
    deleteUser(id);
    console.log("Error occurred:", error);
    return { message: "failed", status: 500 };
  }
}
