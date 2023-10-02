import {NextRequest, NextResponse} from "next/server";
import {compare} from "bcryptjs";

import prisma from "@/services/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user)
    return new NextResponse(JSON.stringify({ message:"Invalid credentials" }), {status: 401});

  const isValid = await compare(password, user.password);
  if (!isValid)
    return new NextResponse(JSON.stringify({ message:"Invalid credentials" }), {status: 401});

  return new NextResponse(JSON.stringify(user));
}
