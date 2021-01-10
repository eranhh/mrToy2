import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

const URL = `http://localhost:3030/api/toy`

export const toyService = {
    query,
    getToyById,
    saveToy,
    removeToy
}

function query(filterBy  = {}) {
    // let url = '';
    // if (filterBy) {
    //     const { name, type,inStock} = filterBy
    //     console.log('inStock', inStock)
    //     url += '?';
    //     let params = new URLSearchParams(url.search);

    //     name && params.set('name', name);
    //     type !== 'All' && params.set('type', type);
    //     inStock && params.set('inStock', inStock);
        
    //     // price && params.set('price', price);
    //     url += params.toString()
    // }
    // return axios.get(`${URL}${url}`)
    // .then(res => { return res.data })

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