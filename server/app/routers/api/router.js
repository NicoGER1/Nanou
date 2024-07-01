const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const EmergencyRouter = require("./emergency/EmergencyRouter");

router.use("/emergency", EmergencyRouter);

const ParentsRouter = require("./parents/ParentsRouter");

router.use("/parents", ParentsRouter);

const ChildrensRouter = require("./childrens/ChildrensRouter");

router.use("/childrens", ChildrensRouter);

const EventsRouter = require("./events/EventsRouter");

router.use("/events", EventsRouter);

const ChildrensParentsRouter = require("./childrens_parents/ChildrensParentsRouter");

router.use("/childrens_parents", ChildrensParentsRouter);

/* ************************************************************************* */

module.exports = router;
