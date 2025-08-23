import prisma from "@/prisma/connections";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    // const deleted = await prisma.session.deleteMany({
    //   where: {
    //     expires: { lt: new Date() },
    //   },
    // });
    // console.log(deleted);
  } catch (error) {
    console.error("Failed to delete expired sessions", error);
  }
  return new Response("complete sweep and 12 hours later", { status: 200 });
}
