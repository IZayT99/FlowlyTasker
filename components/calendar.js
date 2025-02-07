"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../components/styles/calendar.css";  // Chemin relatif pour tes styles

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());  // État pour la date actuelle

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

  // Fonction de gestion de la navigation
  const handleNavigate = (newDate) => {
    setDate(newDate);  // Mise à jour de la date pour la navigation
  };

  // Personnalisation du rendu des événements dans le calendrier
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: '#f39c12',
      color: 'white',
      borderRadius: '4px',
      padding: '5px',
      fontSize: '14px',
      minHeight: '50px',  // Hauteur minimale pour chaque boîte
      maxHeight: '50px',  // Hauteur maximale pour ne pas laisser les boîtes devenir trop grandes
    };
  
    // Vérifier si l'événement a une durée trop longue
    const eventDuration = (new Date(event.end) - new Date(event.start)) / (1000 * 60);  // Durée en minutes
    if (eventDuration > 60) {
      style.height = '50px';  // Réduit la hauteur pour les événements longs
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
            views={['week']}  // Afficher uniquement la vue "week"
            defaultView="week"
            step={60}  // Plage horaire de 60 minutes
            min={new Date(2025, 1, 6, 8, 0)}  // Heure de début
            max={new Date(2025, 1, 6, 18, 0)}  // Heure de fin
            style={{ height: '625px' }}
            date={date}  // Assigner la date actuelle
            onNavigate={handleNavigate}  // Gestion de la navigation
            toolbar={false}  // Désactive la barre d'outils (et donc les boutons par défaut)
            eventPropGetter={eventStyleGetter}  // Applique les styles personnalisés aux événements
          />
        </div>
      </div>

      <div className="button-container text-center mt-4">
        {/* Bouton Today */}
        <button onClick={() => setDate(new Date())} className="btn btn-primary mr-2">
          Aujourd'hui
        </button>
        {/* Bouton Back */}
        <button onClick={() => handleNavigate(moment(date).subtract(1, "week").toDate())} className="btn btn-secondary mr-2">
          Précédent
        </button>
        {/* Bouton Next */}
        <button onClick={() => handleNavigate(moment(date).add(1, "week").toDate())} className="btn btn-secondary">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default MyCalendar;
