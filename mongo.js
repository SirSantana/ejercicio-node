import mongoose from 'mongoose'
import  { password }  from './password.js'


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}



const url =
  `mongodb+srv://santaNaN:${password}@cluster0.exgvi.mongodb.net/ejerciciopreguntas?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  nombre: String,
  date: Date,
  important: Boolean,
  repuesto: String, 
  marca: String,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    nombre:"Ramiro",
    date: new Date(),
    important: true,
    repuesto: "Eje levas ", 
    marca: "Chevrolet Captiva 2012",
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(res=>{
    console.log(res);
    mongoose.connection.close()
})