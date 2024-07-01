import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const eventShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  allDay: PropTypes.bool.isRequired,
});

function EventModal({
  isOpen,
  onRequestClose,
  onSubmit,
  onUpdate,
  onDelete,
  defaultStart,
  defaultEnd,
  selectedEvent,
}) {
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [start, setStart] = useState(
    selectedEvent ? selectedEvent.start : defaultStart
  );
  const [end, setEnd] = useState(
    selectedEvent ? selectedEvent.end : defaultEnd
  );
  const [allDay, setAllDay] = useState(
    selectedEvent ? selectedEvent.allDay : false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { title, start, end, allDay };

    if (selectedEvent) {
      event.id = selectedEvent.id;
      onUpdate(event);
    } else {
      onSubmit(event);
    }
    onRequestClose();
  };

  const handleDelete = () => {
    onDelete(selectedEvent);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={selectedEvent ? "Update Event" : "Add Event"}
    >
      <h2>{selectedEvent ? "Update Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event-title">Title</label>
          <input
            id="event-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="event-start">Start</label>
          <input
            id="event-start"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            disabled={allDay}
          />
        </div>
        <div>
          <label htmlFor="event-end">End</label>
          <input
            id="event-end"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            disabled={allDay}
          />
        </div>
        <div>
          <label htmlFor="event-all-day">
            <input
              id="event-all-day"
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
            All Day
          </label>
        </div>
        <button type="submit">
          {selectedEvent ? "Update Event" : "Add Event"}
        </button>
        {selectedEvent && (
          <button
            type="button"
            onClick={handleDelete}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete Event
          </button>
        )}
      </form>
    </Modal>
  );
}

EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  defaultStart: PropTypes.string,
  defaultEnd: PropTypes.string,
  selectedEvent: eventShape,
};

EventModal.defaultProps = {
  defaultStart: "",
  defaultEnd: "",
  selectedEvent: null,
};

export default EventModal;
