import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


//POST Create wine entry
export async function POST(req, res) {
    console.log("[POST api/wines] Create wine entry...")
    let data = await req.json();
    const { name, year, type, verietal, rating } = data;

    if (!name || !year || !type || !verietal || !rating) {
        return NextResponse.json({ message: "There are missing required fields" }, { status: 400 });
    }

    const newWineEntry = await prisma.wine.create({
        data
    })

    return NextResponse.json(newWineEntry, { status: 201 });
}

//Get all Wines
export async function GET(req, res) {
    console.log("[GET api/wines] get all wines...")
    const list = await prisma.wine.findMany();

    return NextResponse.json(list, { status: 201 });
}

//PUT update a wine from list
export async function PUT(req, res) {
    console.log("[PUT api/wines] Update wine entry...")
    let data = await req.json();
    const { name, year, type, verietal, rating, wineId, ownerId, consumed, dateConsumed } = data;


    if (!name || !year || !type || !verietal || !rating) {
        return NextResponse.json({ message: "There are missing required fields" }, { status: 400 });
    }

    const updatedWine = await prisma.wine.update({
        where: {
            id: wineId,
        },
        data: {
            name, year, type, verietal, rating, ownerId, consumed, dateConsumed
        },
    })

    return NextResponse.json(updatedWine, { status: 201 });
}