import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

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

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Get user ID from request
function getUserIdFromRequest(req: NextRequest): number | null {
  const auth = req.headers.get('authorization');
  // Remove Bearer prefix from token
  if (!auth) return null;
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    return payload.userId;
  } catch {
    return null;
  }
}

// Get user's view history
export async function GET(req: NextRequest) {
  console.time('API /api/history');
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const history = await prisma.viewHistory.findMany({
    where: { userId },
    orderBy: { viewedAt: 'desc' },
    take: 10,
    select: { coinId: true, viewedAt: true },
  });
  console.timeEnd('API /api/history');
  return NextResponse.json(history);
}

// Add a coin to user's view history
export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { coinId } = await req.json();
  const record = await prisma.viewHistory.create({ data: { userId, coinId } });
  return NextResponse.json(record);
}
