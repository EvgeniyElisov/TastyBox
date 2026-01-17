import { NextResponse } from "next/server";
import { prisma } from "prisma/prisma";

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true,
      },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { message: "Ошибка при получении историй" },
      { status: 500 }
    );
  }
}
