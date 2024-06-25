import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CalendarComponent() {
  const [events, setEvents] = useState([
    { id: "1", title: "Event 1", start: "2024-06-23" },
    { id: "2", title: "Event 2", start: "2024-06-24" },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (event) => {
    setCurrentEvent(event);
    setTitle(event ? event.title : "");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentEvent(null);
    setTitle("");
  };

  const handleDateClick = (info) => {
    openModal({ start: info.dateStr });
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.startStr,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleEventClick = (info) => {
    openModal(info.event);
  };

  const handleSubmit = () => {
    if (currentEvent.id) {
      const updatedEvents = events.map((event) => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            title,
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: String(events.length + 1),
        title,
        start: currentEvent.start,
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay today prev,next",
        }}
        events={events}
        dateClick={handleDateClick}
        editable
        droppable
        eventDrop={handleEventDrop}
        eventClick={handleEventClick}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{currentEvent?.id ? "Edit Event" : "Add Event"}</h2>
        <form>
          <label>
            Event Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleSubmit}>
            {currentEvent?.id ? "Update" : "Add"} Event
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
