"use server";
import { SignJWT, jwtVerify } from "jose";
import axios from "axios";
import { JWTPayload } from "jose";
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
export async function encrypt(payload: JWTPayload) {
  // encrypt sessions
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  //decrypt sessions
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    const data = await axios.post(
      "http://localhost:3000/api/auth/validate_session",
      { payload }
    );
    if (data.data.message == 'success') return payload
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}
