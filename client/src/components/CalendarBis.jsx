import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment"; // Importe moment
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

function CalendarBis() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const data = await response.json();
      
      // Formater les dates à l'aide de moment.js
      const formattedEvents = data.map(event => ({
        ...event,
        start: new Date(event.start), // Convertit en objet Date
        end: new Date(event.end) // Convertit en objet Date
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleAddEvent = async (event) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        fetchEvents();
      } else {
        console.error("Failed to add event. Server response:", response);
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        fetchEvents();
      } else {
        console.error("Failed to update event. Server response:", response);
      }
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const handleDeleteEvent = async (event) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEvents();
      } else {
        console.error("Failed to delete event. Server response:", response);
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      {modalOpen && (
        <EventModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          onSubmit={handleAddEvent}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
          defaultStart={selectedSlot ? moment(selectedSlot.start).format("YYYY-MM-DDTHH:mm") : ""}
          defaultEnd={selectedSlot ? moment(selectedSlot.end).format("YYYY-MM-DDTHH:mm") : ""}
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
}

export default CalendarBis;
