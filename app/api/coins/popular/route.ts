import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('query', (e) => {
  console.log(`[PRISMA QUERY] ${e.query} | params: ${e.params} | duration: ${e.duration}ms`);
});

// Get the top 5 most popular coins
export async function GET() {
  console.time('API /api/coins/popular');
  const top = await prisma.coinViewCount.findMany({
    orderBy: { count: 'desc' },
    take: 5,
    select: { coinId: true, count: true },
  });
  console.timeEnd('API /api/coins/popular');
  return NextResponse.json(top);
}

// Increment the view count for a coin
export async function POST(req: NextRequest) {
  const { coinId } = await req.json();
  if (!coinId) return NextResponse.json({ error: 'coinId required' }, { status: 400 });
  // Upsert: increment if exists, else create
  const updated = await prisma.coinViewCount.upsert({
    where: { coinId },
    update: { count: { increment: 1 } },
    create: { coinId, count: 1 },
  });
  return NextResponse.json(updated);
}
