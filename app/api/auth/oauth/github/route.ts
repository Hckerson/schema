"use server";
import prisma from "@/prisma/connections";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/encryption";

export async function GET(request: Request) {
  console.log(request.method);
  const session = await auth();
  if (session == null)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  const { user } = session;
  if (user == null)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  const { email, image, firstName, lastName, verified } = user;
  const hours = 48;
  const expiresAt = new Date(Date.now() + hours * 3600 * 1000);
  const user_email = await prisma.user.findUnique({
    where: { email: email as string },
  });
  if (user_email == null) {
    const user = await prisma.user.create({
      data: {
        email: email as string,
        status: verified ? "verified" : "unverified",
        localStatus: false,
        username: (firstName as string) || (lastName as string),
        provider: "github",
        avatar: { create: { image: image as string } },
        sessions: { create: { expires: expiresAt } },
      },
      include: {
        sessions: true,
      },
    });
    const { sessions } = user;
    if (sessions) {
      const { id: sessionId, userId } = sessions[sessions.length - 1];
      const cookieStore = await cookies();
      const encryptedSession = await encrypt({ sessionId, expiresAt, userId });
      cookieStore.set("h_session", encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
      });
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/contact",
        },
      });
    }
  } else {
    const user = await prisma.user.findUnique({
      where: { email: email as string, localStatus: false },
    });
    if (user) {
      const { id } = user;
      const [session_data] = await prisma.session.createManyAndReturn({
        data: { userId: id, expires: expiresAt },
      });
      const { id: sessionId, userId } = session_data;
      const encryptedSession = await encrypt({ sessionId, expiresAt, userId });
      const cookieStore = await cookies();

      cookieStore.set("h_session", encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
      });
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/contact",
        },
      });
    } else {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login?error=github-signin-not-allowed",
        },
      });
    }
  }
}
