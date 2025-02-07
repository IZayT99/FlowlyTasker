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

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = [
        {
          title: "Réunion avec l'équipe",
          start: new Date(2025, 1, 6, 10, 0),
          end: new Date(2025, 1, 6, 11, 0),
        },
        {
          title: "Déjeuner avec client",
          start: new Date(2025, 1, 6, 12, 0),
          end: new Date(2025, 1, 6, 13, 0),
        },
        {
          title: "Revue de projet",
          start: new Date(2025, 1, 6, 14, 0),
          end: new Date(2025, 1, 6, 15, 0),
        },
      ];
      setEvents(fetchedEvents);
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
    </div>
  );
};

export default MyCalendar;
