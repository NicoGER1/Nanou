const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const childrensParents = await tables.childrensParents.readAll();

    // Respond with the items in JSON format
    res.json(childrensParents);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const childrensParents = await tables.childrensParents.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (childrensParents == null) {
      res.sendStatus(404);
    } else {
      res.json(childrensParents);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const readByChildrenId = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const childrensParents = await tables.childrensParents.readByChildrenId(req.params.childrenId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (childrensParents == null) {
      res.sendStatus(404);
    } else {
      res.json(childrensParents);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  // Extract the category data from the request body and params
  const childrensParents = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.childrensParents.update(childrensParents);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const childrensParents = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.childrensParents.create(childrensParents);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
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
    await tables.childrensParents.delete(req.params.id);

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
  readByChildrenId,
  edit,
  add,
  destroy,
};
