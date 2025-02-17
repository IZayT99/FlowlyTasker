"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../components/styles/calendar.css";  // Relative path for your styles

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());  // State for the current date
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
        console.log('Fetched events:', data); // Debugging line
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Function to handle navigation
  const handleNavigate = (newDate) => {
    setDate(newDate);  // Update the date for navigation
  };

  // Custom styling for events in the calendar
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: '#f39c12',
      color: 'white',
      borderRadius: '4px',
      padding: '5px',
      fontSize: '14px',
      minHeight: '50px',  // Minimum height for each box
      maxHeight: '50px',  // Maximum height to prevent boxes from getting too large
    };
  
    // Check if the event has a duration that is too long
    const eventDuration = (new Date(event.end) - new Date(event.start)) / (1000 * 60);  // Duration in minutes
    if (eventDuration > 60) {
      style.height = '50px';  // Reduce height for long events
    }
  
    return {
      style,
    };
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
      setEvents((prevEvents) => [...prevEvents, savedEvent]);
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
    try {
      await fetch('/api/events', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: eventToDelete._id }),
      });
      setEvents((prevEvents) => prevEvents.filter((e) => e._id !== eventToDelete._id));
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
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
            views={['week']}  // Show only the "week" view
            defaultView="week"
            step={60}  // Time slot of 60 minutes
            min={new Date(2025, 1, 6, 8, 0)}  // Start time
            max={new Date(2025, 1, 6, 18, 0)}  // End time
            style={{ height: '625px' }}
            date={date}  // Assign the current date
            onNavigate={handleNavigate}  // Handle navigation
            toolbar={false}  // Disable the toolbar (and thus the default buttons)
            eventPropGetter={eventStyleGetter}  // Apply custom styles to events
            selectable={true} // Enable date selection
            onSelectSlot={handleSelectSlot} // Handle date selection
            onSelectEvent={handleSelectEvent} // Handle event selection
          />
        </div>
      </div>

      <div className="button-container text-center mt-4">
        {/* Today Button */}
        <button onClick={() => setDate(new Date())} className="btn btn-primary mr-2">
          Aujourd&apos;hui
        </button>
        {/* Back Button */}
        <button onClick={() => handleNavigate(moment(date).subtract(1, "week").toDate())} className="btn btn-secondary mr-2">
          Précédent
        </button>
        {/* Next Button */}
        <button onClick={() => handleNavigate(moment(date).add(1, "week").toDate())} className="btn btn-secondary">
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventDetails.title}
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventDetails.description}
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full"
        />
        <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
      </div>
    </div>
  );
}

function DeleteEventModal({ isOpen, onClose, onDelete, event }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Event</h2>
        <p>Are you sure you want to delete the event &quot;{event.title}&quot;?</p>
        <button onClick={onDelete} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
      </div>
    </div>
  );
}

export default MyCalendar;
