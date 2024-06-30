import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allDay, setAllDay] = useState(false);

  const fetchEvents = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/schedule`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (event) => {
    setCurrentEvent(event || null);
    setTitle(event ? event.title : "");
    setStartTime(event ? event.startStr : "");
    setEndTime(event ? event.endStr : "");
    setAllDay(event ? event.allDay : false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentEvent(null);
    setTitle("");
    setStartTime("");
    setEndTime("");
    setAllDay(false);
  };

  const handleDateClick = (info) => {
    openModal({ start: info.dateStr, end: info.dateStr });
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      start_hour: event.startStr,
      end_hour: event.endStr,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/schedule/${event.id}`,
        updatedEvent
      )
      .then((response) => {
        console.info("Event updated successfully:", response.data);
        // Update events in state
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.id === event.id ? { ...e, ...updatedEvent } : e
          )
        );
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const handleEventClick = (info) => {
    openModal(info.event);
  };

  const handleSubmit = () => {
    if (currentEvent && currentEvent.id) {
      // Update existing event
      const updatedEvent = {
        id: currentEvent.id,
        title,
        all_day: allDay,
        start_hour: allDay ? null : startTime,
        end_hour: allDay ? null : endTime,
      };

      axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/schedule/${currentEvent.id}`,
          updatedEvent
        )
        .then((response) => {
          console.info("Event updated successfully:", response.data);
          // Update events in state
          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e.id === currentEvent.id ? { ...e, ...updatedEvent } : e
            )
          );
        })
        .catch((error) => {
          console.error("Error updating event:", error);
        });
    } else {
      // Create new event
      const newEvent = {
        title,
        all_day: allDay,
        start_hour: allDay ? null : startTime,
        end_hour: allDay ? null : endTime,
      };

      axios
        .post(`${import.meta.env.VITE_API_URL}/api/schedule`, newEvent)
        .then((response) => {
          console.info("Event created successfully:", response.data);
          // Add new event to events state
          setEvents((prevEvents) => [...prevEvents, response.data]);
        })
        .catch((error) => {
          console.error("Error creating event:", error);
        });
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
          center: "",
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
