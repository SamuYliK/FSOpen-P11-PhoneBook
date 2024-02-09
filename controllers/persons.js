const personsRouter = require('express').Router()
const morgan = require('morgan')
const Person = require('../models/person')

morgan.token('postBody', (request) => {
  return JSON.stringify(request.body)
})

personsRouter.get('/api/persons', morgan('tiny'), (request, response, next) => {
  Person.find({})
    .then( person => {
      response.json(person)
    })
    .catch( error => next(error))
})

personsRouter.get('/api/persons/:id', morgan('tiny'), (request, response, next) => {
  Person.findById(request.params.id)
    .then(foundPerson => {
      if(foundPerson){
        response.json(foundPerson)
      } else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.delete('/api/persons/:id', morgan('tiny'), (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then( response.status(204).end() )
    .catch( error => next(error))
})

personsRouter.put('/api/persons/:id', morgan(':method :url :status :res[content-length] - :response-time ms :postBody'), (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new:true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

personsRouter.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :postBody'), (request, response, next) => {
  const body = request.body
  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

personsRouter.get('/info', morgan('tiny'), (request, response, next) => {
  const fullDate = new Date().toString()
  Person.find({})
    .then( person => {
      response.send(`<p>Phonebook has info for ${person.length} people</p><p>${fullDate}</p>`)
    })
    .catch(error => next(error))
})

module.exports = personsRouter


