import {NextRequest, NextResponse} from "next/server";
import { hash } from "bcryptjs";

import prisma from "@/services/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, email, password } = await req.json();

  if (!name || !email ||!password)
    return new NextResponse(JSON.stringify({message: "Missing fields"}), {status: 401});

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user)
    return new NextResponse(JSON.stringify({message: "User already exists"}), {status: 401});

  const pwdHash = await hash(password, 10);

  const createdUser = await prisma.user.create({data: {
    name, email, password: pwdHash
  }});

  return new NextResponse(JSON.stringify(createdUser));
}
