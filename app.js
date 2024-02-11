require('dotenv').config()
const express = require('express')
const app = express()

const personsRouter = require('./controllers/persons')

app.use(express.static('build'))
app.use(express.json())

app.use('/', personsRouter)

// Check that new version is deployed
app.get('/version', (req, res) => {
  res.send('Release V9') // Change
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  /* eslint-disable-next-line no-console*/
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console*/
  console.log(`Server running on port ${PORT}`)
})

