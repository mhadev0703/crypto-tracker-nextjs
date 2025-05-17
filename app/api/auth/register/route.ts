import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

// Register a new user
export async function POST(req: NextRequest) {
  const body = await req.json();

  // Validate input using Zod
  const parse = registerSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.errors }, { status: 400 });
  }
  const { email, password } = parse.data;

  // Check for duplicate email
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { email, passwordHash },
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
