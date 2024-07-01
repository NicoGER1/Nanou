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
      shouldCloseOnOverlayClick
      contentLabel={selectedEvent ? "Update Event" : "Add Event"}
      className="modal-overlay"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <button type="button" onClick={onRequestClose} className="modal-button">
          Close
        </button>
        <h2 className="modal-header">
          {selectedEvent ? "Update Event" : "Add Event"}
        </h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event-title">Title</label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-start">Start</label>
            <input
              id="event-start"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              disabled={allDay}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-end">End</label>
            <input
              id="event-end"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              disabled={allDay}
              className="form-control"
            />
          </div>
          <div className="form-group form-check">
            <input
              id="event-all-day"
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="event-all-day" className="form-check-label">
              All Day
            </label>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="modal-button">
              {selectedEvent ? "Update Event" : "Add Event"}
            </button>
            {selectedEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="modal-delete-button"
              >
                Delete Event
              </button>
            )}
          </div>
        </form>
      </div>
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
