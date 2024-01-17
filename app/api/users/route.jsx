import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

//GET return all users
export async function GET() {
    console.log("[GET api/users] get all users...")
    const users = await prisma.user.findMany({
        select: { password: false, name: true, id: true, email: true, _count: true }
    });
    return NextResponse.json(users, { status: 200 });
}

// POST Login user
export async function POST(req, res) {
    console.log("[POST api/users] Login user...")
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Email and Password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: 'test@test.com',
        },
    });

    if (!user) {
        return NextResponse.json({ message: "Invalid email or password. Please try again." }, { status: 400 });
    }

    if (user.password !== password) {
        return NextResponse.json({ message: "Invalid email or password. Please try again." }, { status: 400 })
    }
    return NextResponse.json({ message: "Login seccessful" }, { status: 200 })
}
