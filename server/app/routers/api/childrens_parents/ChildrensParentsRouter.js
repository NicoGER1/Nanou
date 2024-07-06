const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  readByChildrenId,
  edit,
  add,
  destroy,
} = require("../../../controllers/childrensParentsAction");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

router.get("/child/:childrenId", readByChildrenId)

// Route to edit a new item
router.put("/", edit);

// Route to add a new item
router.post("/", add);

// Route to delete an item
router.delete("/", destroy);

/* ************************************************************************* */

module.exports = router;
