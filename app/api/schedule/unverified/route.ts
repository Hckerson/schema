import prisma from "@/prisma/connections";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) { 
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    // const deleted = await prisma.user.deleteMany({
    //   where: {
    //     status: "unverified",
    //     createdAt: { lt: new Date(Date.now() - 86400000) },
    //   },
    // });
    // console.log(deleted);
  } catch (error) {
    console.error("Failed to delete unverified users", error);
  }
  return new Response("complete sweep and 12 hours later", { status: 200 });
}
