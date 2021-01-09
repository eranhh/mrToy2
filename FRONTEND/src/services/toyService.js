import axios from 'axios'

const URL = `http://localhost:3030/api/toy`

export const toyService = {
    query,
    getToyById,
    saveToy,
    removeToy
}

function query(filterBy  = {}) {
    return axios.get(URL, {params: filterBy}).then(res => { return res.data })
}

function getToyById(toyId) {
    return axios.get(`${URL}/${toyId}`)
        .then(res => res.data)
}

function saveToy(toyToSave) {
    if (toyToSave._id) {
        // UPDATE
        return axios.put(`${URL}/${toyToSave._id}`, toyToSave)
            .then(res => res.data)
    } else {
        // CREATE
        return axios.post(URL, toyToSave)
            .then(res => res.data)
    }
}

function removeToy(toyId) {
    return axios.delete(`${URL}/${toyId}`)
}