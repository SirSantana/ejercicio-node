import express from "express";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())

let questions = [
  {
    id: 1,
    nombre: "Miguel",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
    repuesto: "Impulsadores",
    marca: "Chevrolet Corsa",
  },
  {
    id: 2,
    nombre: "Miguel",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
    repuesto: "Impulsadores",
    marca: "Chevrolet Corsa",
  },
];

app.get("/", (req, res) => {
  res.send("<h2>Bienvenidos a colMotors, cotiza en 30 minutos!</h2>");
});

app.get("/api/preguntas", (req, res) => {
  res.json(questions);
});
app.get("/api/pregunta/:id", (req, res) => {
  const { id } = req.params;
  const pregunta = questions.find((quest) => quest.id === Number(id));

  if (pregunta) {
    res.json(pregunta);
    
  } else {
    res.status(404).end();
  }
});
app.delete("/api/pregunta/:id", (req, res) => {
  const { id } = req.params;
  const pregunta = questions.filter((quest) => quest.id !== Number(id));

  res.json(pregunta);
  res.status(204).end();
});


const generateId = () => {
    const maxId = questions.length > 0 ? Math.max(...questions.map((n) => n.id)) : 0;
    return maxId + 1;
  };

app.post("/api/preguntas", (req, res) => {
  const body = req.body;
  
    const quest = {
    id: generateId(),
    nombre: body.nombre,
    date: new Date(),
    important: body.important || false,
    repuesto: body.repuesto,
    marca: body.marca,
    }

  questions = questions.concat(quest)
  res.json(quest)
  

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
