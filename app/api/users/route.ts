import { NextRequest, NextResponse } from "next/server";
import { prisma } from "prisma/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Ошибка при получении пользователей" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Ошибка при создании пользователя" },
      { status: 500 }
    );
  }
}
 