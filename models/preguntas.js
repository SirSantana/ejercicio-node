const mongoose = require('mongoose') 
require('dotenv').config()



const url = process.env.MONGODB_URI


mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })




const noteSchema = new mongoose.Schema({
nombre: String,
date: Date,
important: Boolean,
repuesto: String, 
marca: String,
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)