import { connectToDatabase } from '../../../libs/mongo';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../libs/next-auth'; // Ensure this is correctly imported
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';


export async function POST(req) {
  const session = await getServerSession({ req, authOptions });
  if (!session || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const userId = session.user.id;
  const { eventTitle, eventDate, eventDescription } = await req.json();

  const result = await db.collection('events').insertOne({
    userId,
    eventTitle,
    eventDate: new Date(eventDate),
    eventDescription,
  });

  return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
}

export async function GET(req) {
  const session = await getServerSession({ req, authOptions });
  if (!session || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const userId = session.user.id;

  const events = await db.collection('events').find({ userId }).toArray();

  return NextResponse.json(events, { status: 200 });
}

export async function DELETE(req) {
  const session = await getServerSession({ req, authOptions });
  console.log('Session:', session);
  if (!session || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const userId = session.user.id;
  const { eventId } = await req.json();

  if (!eventId) {
    console.error('Event ID not provided');
    return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
  }

  console.log('Deleting event with ID:', eventId, 'for user:', userId);

  const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId), userId });
  if (result.deletedCount === 0) {
    return NextResponse.json({ message: 'Event not found or not authorized' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
} 