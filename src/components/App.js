import React from 'react'
import { useState, useEffect } from 'react'
import personService from '../services/persons'
import ChangeNotification from './ChangeNotification'
import ErrorNotification from './ErrorNotification'

const Filter = ({ value, handleFilter }) => {
  return(
    <div>
      filter shown with
      <input value={value} onChange={handleFilter}/>
    </div>
  )
}

const PersonForm = ({ nameValue, handleNameChange, numberValue, handleNumberChange, handleClick,text }) => {
  return (
    <form>
      <div>name: <input value={nameValue} onChange={handleNameChange}/></div>
      <div>number: <input value={numberValue} onChange={handleNumberChange}/></div>
      <div>
        <button onClick={handleClick}>{text}</button>
      </div>
    </form>
  )
}

const Persons = ({ name, number, handleClick, text }) => {
  return(
    <p>{name} {number}
      <button onClick={handleClick}>
        {text}
      </button>
    </p>)
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [changeNotification, setChangeNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const loydetty = persons.find(x => x.name === newName)
    if (typeof(loydetty) !== 'undefined'){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(loydetty.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map( p =>
              p.id !== loydetty.id ? p : updatedPerson))
            setChangeNotification(`Changed number of ${updatedPerson.name}`)
          })
          .catch(error => {
            setErrorNotification(`Information of ${newName} has already been removed from server. Error: ${error}`)
            personService
              .getAll()
              .then(currentPersons => {
                setPersons(currentPersons)
              })
          })
        setTimeout(() => {setErrorNotification(null)}, 3000)
        setTimeout(() => {setChangeNotification(null)}, 3000)
      }
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setChangeNotification(`Added ${returnedPerson.name}`)
        })
      setTimeout(() => {setChangeNotification(null)}, 3000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const handleRemoveClick = ({ name, id }) => {
    if (window.confirm(`Delete ${name} ?`)){
      personService
        .uselessPerson(id)
      personService
        .getAll()
        .then(currentPersons => {
          setPersons(currentPersons)
          setChangeNotification(`Removed ${name} from phonebook`)
        })
      setTimeout(() => {setChangeNotification(null)}, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorNotification} />
      <ChangeNotification message={changeNotification} />

      <Filter
        value={nameFilter}
        handleFilter = {handleNameFilter}
      />

      <h3>Add a new</h3>

      <PersonForm
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={addPerson}
        text="add"
      />

      <h3>Numbers</h3>

      {persons.filter((x) => x.name.toLowerCase().includes(nameFilter.toLowerCase())).map(y =>
        <Persons
          key={y.id}
          name={y.name}
          number={y.number}
          handleClick={() => handleRemoveClick(y)}
          text='delete'
        />
      )}
    </div>
  )
}

export default App