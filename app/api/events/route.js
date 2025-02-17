import { connectToDatabase } from '../../../libs/mongo';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getSession({ req });
  console.log('Session:', session);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectMongo();
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
  console.log('Session:', session);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectMongo();
  const userId = session.user.id;

  const events = await db.collection('events').find({ userId }).toArray();
  console.log('Fetched events from DB:', events);

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

const fetchEvents = async () => {
  try {
    const response = await fetch('/api/events', {
      method: 'GET',
      credentials: 'include', // Ensure credentials are included
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setEvents(data);
    } else {
      console.error('Expected an array but got:', data);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

const handleSaveEvent = async () => {
  const newEvent = {
    eventTitle: eventDetails.title,
    eventDate: selectedDate,
    eventDescription: eventDetails.description,
  };

  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure credentials are included
      body: JSON.stringify(newEvent),
    });
    const savedEvent = await response.json();
    if (savedEvent && savedEvent._id) {
      setEvents((prevEvents) => [...prevEvents, savedEvent]);
    } else {
      console.error('Invalid event data:', savedEvent);
    }
    setIsModalOpen(false);
    setEventDetails({ title: '', description: '' });
  } catch (error) {
    console.error('Error saving event:', error);
  }
}; 