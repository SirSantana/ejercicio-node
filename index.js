require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const Note = require("./models/preguntas");
const errorhandlers = require("./middleware/errorhandlers");
const noteFound = require("./middleware/noteFound");

app.use(express.json());
app.use(cors());

app.get("/api/preguntas", (req, res) => {
  Note.find({}).then((questions) => {
    res.json(questions);
  });
});

app.get("/", (req, res,) => {
  res.json("<h2>Bienvenidos a colMotors</h2>");
});

app.get("/api/preguntas/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((quest) => {
      quest
        ? res.json(quest)
        : res.status(404).json({ err: "No se encontro" }).end();
    })
    .catch((error) => next(error));
});
app.put("/api/pregunta/:id", (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  const note = {
    important: body.important,
  };

  Note.findByIdAndUpdate(id, note, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

app.delete("/api/pregunta/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then(() => {})
    .catch((error) => next(error));

  res.status(404).end();
});

app.post("/api/preguntas", (req, res) => {
  const body = req.body;

  if (body === undefined) {
    console.log(body);
    return res.status(400).json({ error: "Missing Content" });
  }
  const quest = new Note({
    nombre: body.nombre,
    date: new Date(),
    important: body.important || false,
    repuesto: body.repuesto,
    marca: body.marca,
  });

  quest.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.use(noteFound);

app.use(errorhandlers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
