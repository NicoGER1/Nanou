const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import events-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/eventsAction");

// Route to get a list of events
router.get("/", browse);

// Route to get a specific events by ID
router.get("/:id", read);

// Route to edit a new events
router.put("/:id", edit);

// Route to add a new events
router.post("/", add);

// Route to delete an events
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
