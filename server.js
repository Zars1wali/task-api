const express = require("express");

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Buy groceries", done: false },
  { id: 2, title: "Walk the dog", done: true },
  { id: 3, title: "Read a book", done: false },
];
let nextId = 4;

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }
  res.json(task);
});

app.post("/tasks", (req, res) => {
  if (!req.body.title || req.body.title.trim() === "") {
    return res.status(400).json({ error: "Title is required and cannot be empty" });
  }
  const task = { id: nextId++, title: req.body.title.trim(), done: false };
  tasks.push(task);
  res.status(201).json(task);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
