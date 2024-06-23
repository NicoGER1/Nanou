// Import the repository modules responsible for handling data operations on the tables
const EmergencyRepository = require ("./models/EmergencyRepository");
const ParentsRepository = require("./models/ParentsRepository");
const ScheduleRepository = require ("./models/Schedule.Repository");
const ChildrenRepository = require ("./models/Children.Repository");
const ChildrensParentsRepository = require ("./models/ChildrensParents.Repository");
const ScheduleChildrenRepository = require ("./models/ScheduleChildren.Repository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.emergency = new EmergencyRepository();
tables.parents = new ParentsRepository();
tables.schedule = new ScheduleRepository();
tables.children = new ChildrenRepository();
tables.childrensParents = new ChildrensParentsRepository();
tables.scheduleChildren = new ScheduleChildrenRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
