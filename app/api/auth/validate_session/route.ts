"use server";
import prisma from "@/prisma/connections";

export async function POST(request: Request) {
  const body = await request.json();
  const { payload } = body;
  const session_data = await prisma.session.findUnique({
    where: { id: payload.sessionId as string },
  });

  if (session_data) {
    const { id } = session_data;
    if (id == null || !id) {
      return Response.json({ message: "failed", status: 400 });
    }

    return Response.json({ message: "success", status: 200 });
  }
}
