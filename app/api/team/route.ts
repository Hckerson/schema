import prisma from "@/prisma/connections";
export async function GET(request: Request) {
  const result = await prisma.teamMember.findMany({
    include: { user: { include: { avatar: true } } },
  });
  if (!result) {
    return Response.json({ message: "error", data: null });
  }
  return Response.json({ message: "success", data: result });
}
