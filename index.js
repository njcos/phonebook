import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import process from 'process';




const app = express()


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())
app.use(cors())

morgan.token('person', (req) => {
    if (req.method === 'POST' && req.path === '/api/people') {
        return JSON.stringify(req.body);
    }
    return ' '; // Return an empty space for other routes or methods to avoid logging irrelevant data
});

app.use(morgan(':person'))

let people =[ 
    
        { 
          id: 1,
          name: "Arto Hellas", 
          number: "040-123456"
        },
        { 
          id: 2,
          name: "Ada Lovelace", 
          number: "39-44-5323523"
        },
        { 
          id: 3,
          name: "Dan Abramov", 
          number: "12-43-234345"
        },
        { 
          id: 4,
          name: "Mary Poppendieck", 
          number: "39-23-6423122"
        }
    
]

const phonebookLength = people.length
const today = new Date()

console.log(today.toString())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/people', (request, response) => {
    response.json(people)
})

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    response.json(person)
})

app.delete('/api/people/:id', (request,response) => {
    const id = Number(request.params.id)
    people = people.filter(p => p.id !== id)
    response.status(204).end()
    console.log(id)
})

app.post('/api/people', (request, response) => {
    const body = request.body
    const namesArray = people.map(p => p.name)
    const sameName = (namesArray.includes(body.name))


    if(!body.name || !body.number) {
        return response.status(404).json({
            error: 'Content missing.'          
        })
    }
    
    if(sameName) {
        return response.status(404).json({
            error: 'Name Exists'
        })
    }
    
    const getRandomId = (max) => {
        return Math.floor(Math.random() * max)
    } 

    const person ={ 
        id: getRandomId(10000),
        name: body.name,
        number: body.number
    }
        people = people.concat(person)
        response.json(person)
  })


    


app.get('/api/info', (request,response) => {
    response.send(`<div>
        <p>Phonebook has info for ${phonebookLength} people</p>
        <p>${today.toString()}</p>
        </div>`)
})




