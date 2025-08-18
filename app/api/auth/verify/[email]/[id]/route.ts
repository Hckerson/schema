import prisma from '@/prisma/connections'
export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string; id: string }> }
) {
  console.log(request.method);
  const { email, id } = await params;
  const [updatedUser] = await prisma.user.updateManyAndReturn({where : {email : email, id : id}, data : {status : "verified"}})
  const {id : userId } = updatedUser
  if (!userId) {
    return Response.json({ message: "failed to verify users", status: 400 });
  }
  return Response.json({ message: "success", status: 200 });
}
