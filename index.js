import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let showsData = [];
let nextID = 1;

// Add a new show
app.post("/shows", (req, res) => {
  const { name, genre } = req.body;
  const newShow = { id: nextID++, name, genre };
  showsData.push(newShow);
  res.status(201).send(newShow);
});

// Get all the shows
app.get("/shows", (req, res) => {
  res.status(200).send(showsData);
});

// Get show by ID
app.get("/shows/:id", (req, res) => {
  const show = showsData.find((s) => s.id === parseInt(req.params.id));
  if (!show) {
    return res.status(404).send("Show not found");
  }
  res.status(200).send(show);
});

// Update show
app.put("/shows/:id", (req, res) => {
  const show = showsData.find((s) => s.id === parseInt(req.params.id));

  if (!show) {
    return res.status(404).send("Show not found");
  }

  const { name, genre } = req.body;
  show.name = name;
  show.genre = genre;

  res.status(200).send(show);
});

// Delete show
app.delete("/shows/:id", (req, res) => {
  const index = showsData.findIndex((s) => s.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Show not found");
  }

  showsData.splice(index, 1);

  res.status(204).send("Show deleted successfully");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
