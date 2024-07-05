import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/people'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response)
}

export default {getAll, create, deletePerson, updatePerson}