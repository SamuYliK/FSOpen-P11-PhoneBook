const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

/* eslint-disable no-console*/
mongoose.connect(url)
  .then( console.log('Connected to MongoDB') )
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
/* eslint-enable no-console*/

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        if ( /^\d{3}-\d{5,}$/.test(v) ) {
          return true
        } else if ( /^\d{2}-\d{6,}$/.test(v) ){
          return true
        }
        return false
      },
      message: 'Phone number has minimum 8 digits and consists of two parts separated by -. First part includes 2 or 3 numbers. Example 040-1234567',
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)