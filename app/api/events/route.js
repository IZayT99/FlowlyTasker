import { connectToDatabase } from '../../../libs/mongo';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const userId = session.user.id;
  const { eventTitle, eventDate, eventDescription } = await req.json();

  const newEvent = await db.collection('events').insertOne({
    userId,
    eventTitle,
    eventDate: new Date(eventDate),
    eventDescription,
  });

  return NextResponse.json(newEvent.ops[0], { status: 201 });
}

export async function GET(req) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const userId = session.user.id;

  const events = await db.collection('events').find({ userId }).toArray();
  console.log('Fetched events:', events);

  return NextResponse.json(events, { status: 200 });
}

export async function DELETE(req) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const userId = session.user.id;
  const { eventId } = await req.json();

  await db.collection('events').deleteOne({ _id: eventId, userId });
  return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
} 