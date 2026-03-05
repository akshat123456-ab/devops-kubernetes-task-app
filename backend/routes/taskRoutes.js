const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();


// CREATE TASK
router.post("/", auth, async (req, res) => {

 const task = await Task.create({
  user: req.user,
  title: req.body.title,
 });

 res.json(task);

});


// GET TASKS
router.get("/", auth, async (req, res) => {

 const tasks = await Task.find({ user: req.user });

 res.json(tasks);

});


// UPDATE TASK
router.put("/:id", auth, async (req, res) => {

 const task = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
 );

 res.json(task);

});


// DELETE TASK
router.delete("/:id", auth, async (req, res) => {

 await Task.findByIdAndDelete(req.params.id);

 res.json({ msg: "Task deleted" });

});


module.exports = router;