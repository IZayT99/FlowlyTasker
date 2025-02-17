"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../components/styles/calendar.css";  // Relative path for your styles

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDetails, setEventDetails] = useState({ title: '', description: '' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedEvents = data.map(event => ({
            _id: event._id,
            start: new Date(event.eventDate),
            end: new Date(event.eventDate),
            title: event.eventTitle,
            description: event.eventDescription,
          }));
          setEvents(mappedEvents);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: '#f39c12',
      color: 'white',
      borderRadius: '4px',
      padding: '5px',
      fontSize: '14px',
      minHeight: '50px',
      maxHeight: '50px',
    };
    return { style };
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
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
        body: JSON.stringify(newEvent),
      });
      const savedEvent = await response.json();
      console.log('Saved Event:', savedEvent);

      if (response.ok && savedEvent && savedEvent._id) {
        const formattedEvent = {
          _id: savedEvent._id,
          start: new Date(savedEvent.eventDate),
          end: new Date(savedEvent.eventDate),
          title: savedEvent.eventTitle,
          description: savedEvent.eventDescription,
        };
        setEvents((prevEvents) => {
          const updatedEvents = [...prevEvents, formattedEvent];
          console.log('Updated Events:', updatedEvents);
          return updatedEvents;
        });
      } else {
        console.error('Invalid event data:', savedEvent);
      }
      setIsModalOpen(false);
      setEventDetails({ title: '', description: '' });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleSelectEvent = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete || !eventToDelete._id) {
      console.error('No event selected for deletion or event ID is missing');
      return;
    }

    try {
      const response = await fetch(`/api/events`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: eventToDelete._id }),
      });
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((e) => e._id !== eventToDelete._id));
        setIsDeleteModalOpen(false);
        setEventToDelete(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete event:', errorData);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="header text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Calendrier Hebdomadaire</h1>
      </div>
      <div className="calendar-container bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="calendar-content">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            views={['week']}
            defaultView="week"
            step={60}
            min={new Date(2025, 1, 6, 8, 0)}
            max={new Date(2025, 1, 6, 18, 0)}
            style={{ height: '625px' }}
            date={date}
            onNavigate={handleNavigate}
            toolbar={false}
            eventPropGetter={eventStyleGetter}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>

      <div className="button-container text-center mt-4">
        <button
          onClick={() => setDate(new Date())}
          className="bg-gradient-to-b from-gray-800 to-black text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-gray-700 hover:to-black transition duration-200 mr-2"
        >
          Aujourd&apos;hui
        </button>
        <button
          onClick={() => handleNavigate(moment(date).subtract(1, "week").toDate())}
          className="bg-gradient-to-b from-gray-800 to-black text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-gray-700 hover:to-black transition duration-200 mr-2"
        >
          Précédent
        </button>
        <button
          onClick={() => handleNavigate(moment(date).add(1, "week").toDate())}
          className="bg-gradient-to-b from-gray-800 to-black text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-gray-700 hover:to-black transition duration-200"
        >
          Suivant
        </button>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        eventDetails={eventDetails}
        setEventDetails={setEventDetails}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteEvent}
        event={eventToDelete}
      />
    </div>
  );
};

function EventModal({ isOpen, onClose, onSave, eventDetails, setEventDetails }) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-4">Add Event</h2>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventDetails.title}
          onChange={handleChange}
          className="mb-3 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventDetails.description}
          onChange={handleChange}
          className="mb-3 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onSave}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteEventModal({ isOpen, onClose, onDelete, event }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-4">Delete Event</h2>
        <p className="text-white mb-4">
          Are you sure you want to delete the event &quot;{event?.title}&quot;?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
