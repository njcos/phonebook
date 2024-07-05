'use client'

import { useState, useEffect } from "react"
import Person from "./components/Person"
import FilterPeople from "./components/FilterPeople"
import AddNumber from "./components/AddNumber"
import personService from './services/numbers'
import Notification from "./components/Notification"
import ErrorMessage from './components/ErrorMessage'


const App = () => {
const [persons, setPersons] = useState([])
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [filterInput, setFilterInput] = useState('')
const [notificationMessage, setNotificationMessage] = useState(null)
const [errorMessage, setErrorMessage] =useState(null)

const fetchPersons = () => {
  personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}

useEffect(()=>{
  fetchPersons()
}, [])

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const filterNamesInput = (event) => {
  setFilterInput(event.target.value)
}

const filteredPersons = persons.filter(person => 
  person.name?.toLowerCase().includes(filterInput?.toLowerCase() || ''))
 
const addNewName = (event) => {
  event.preventDefault()
  const idNumber = persons.length+1
  const personObject = {
    name: newName,
    number: newNumber,
    id:`${idNumber}`
  }

  const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson){
      const confirmUpdate = (window.confirm(`${newName} Already exists, would you like to update this contact?`))
      if(confirmUpdate){
        console.log(existingPerson)
        console.log(newNumber)
        console.log(existingPerson.id)
        const updatedPerson = {...existingPerson, name:newName, number: newNumber};
      personService
      .updatePerson(existingPerson.id, updatedPerson)
      .then(returnedPerson => {
        const updatedPersons = persons.map(p => (p.id !== existingPerson.id ? p : returnedPerson))
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
        fetchPersons()
      })
     
       .catch (error => {
        setErrorMessage(
          `Note '${newName}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== existingPerson.id))
      })
    

      // setNotificationMessage(`${existingPerson.name} has been updated.`)
      // setTimeout(()=> {
      //   setNotificationMessage(null)
      // }, 3000)
    

    
    }
    } else {

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setNotificationMessage(`${newName} has been created.`)
      setTimeout(()=> {
        setNotificationMessage(null)
      }, 3000)
        
    }
  
}

const deleteHandler = (id) => {
  const person = persons.find(p => p.id === id)
   if (window.confirm(`Are you sure you would like to delete ${person.name}`, true)) {
    console.log(person)
    personService
    .deletePerson(id)
    .then(() => {
      const updatedPersons = persons.filter(p=> p.id !== id)
      setPersons(updatedPersons)
      console.log(persons)
    })
   
  }

}




  return (
    <>
      <h2>Phonebook</h2>
      <ErrorMessage errorMessage={errorMessage} />
      <Notification notification={notificationMessage} />
        <FilterPeople filterprop={filterNamesInput}/>
       
        <AddNumber addname={handleNameChange} addnumber={handleNumberChange} addrecord={addNewName}/>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(persons => 
        <Person key={persons.id} person={persons} deleteHandler={() => deleteHandler(persons.id)}
        />
        )}             
      </ul>
    </>
  )
}

export default App