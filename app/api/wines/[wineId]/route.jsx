import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//GET a signle wine by ID
export async function GET(req, res) {
  console.log("[GET api/wines/wineID] get wine by by ID...")
  const wineID = req.nextUrl.pathname.split('wines/')[1];
  try {

    const dbWine = await prisma.wine.findUnique({
      where: {
        id: parseInt(wineID),
      },
    })
    return NextResponse.json(dbWine, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

}

