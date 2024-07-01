const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all events from the database
    const events = await tables.events.readAll();

    // Respond with the events in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific events from the database based on the provided ID
    const events = await tables.events.read(req.params.id);

    // If the events is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the events in JSON format
    if (events == null) {
      res.sendStatus(404);
    } else {
      res.json(events);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  // Extract the events data from the request body and params
  const events = { ...req.body, id: req.params.id };

  try {
    // Update the events in the database
    await tables.events.update(events);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the events data from the request body
  const events = req.body;

  try {
    // Insert the events into the database
    const insertId = await tables.events.create(events);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted events
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    // Delete the category from the database
    await tables.events.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
