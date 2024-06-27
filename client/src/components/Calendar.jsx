import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(""); // Add start time state
  const [endTime, setEndTime] = useState(""); // Add end time state
  const [allDay, setAllDay] = useState(false); // Add all day state

  const openModal = (event) => {
    setCurrentEvent(event);
    setTitle(event ? event.title : "");
    setStartTime(event ? event.startStr : ""); // Set start time
    setEndTime(event ? event.endStr : ""); // Set end time
    setAllDay(event ? event.allDay : false); // Set all day
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentEvent(null);
    setTitle("");
    setStartTime(""); // Reset start time
    setEndTime(""); // Reset end time
    setAllDay(false); // Reset all day
  };

  const handleDateClick = (info) => {
    openModal({ start: info.dateStr, end: info.dateStr }); // Pass start and end dates with time
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
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
            start: allDay
              ? currentEvent.startStr
              : `${currentEvent.startStr}T${startTime}`,
            end: allDay
              ? currentEvent.startStr
              : `${currentEvent.startStr}T${endTime}`,
            allDay,
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: String(events.length + 1),
        title,
        start: allDay
          ? currentEvent.start
          : `${currentEvent.start}T${startTime}`,
        end: allDay ? currentEvent.start : `${currentEvent.start}T${endTime}`,
        allDay,
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
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
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={allDay}
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={allDay}
            />
          </label>
          <label>
            All Day:
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
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
