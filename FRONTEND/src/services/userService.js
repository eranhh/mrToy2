// import { storageService } from './storageService.js'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})
// import { storageService } from './storageService.js'
// import axios from 'axios'

// const URL = 'http://localhost:3030/api/auth';
// const STORAGE_KEY = 'loggedinUser'

// export const userService = {
//     getLoggedinUser,
//     login,
//     signup,
//     logout
// }

// // credentials strucutre: {username: '', password: ''}
// function login(credentials) {
//     return axios.post(`${URL}/login`, credentials)
//         .then(res => res.data)
//         .then(user => {
//             console.log('Login success');
//             return _handleLogin(user);
//         })
// }
// // credentials strucutre: {username: '', password: '', fullname: ''}
// function signup(credentials) {
//     return axios.post(`${URL}/signup`, credentials)
//         .then(res => res.data)
//         .then(user => {
//             console.log('Signup success');
//             return _handleLogin(user);
//         })
// }
// function logout() {
//     return axios.post(`${URL}/logout`)
//         .then(res => res.data)
//         .then(() => {
//             console.log('Logout success');
//             storageService.clear();
//         })
// }

// function getLoggedinUser() {
//     return storageService.load(STORAGE_KEY)
// }

// function _handleLogin(user) {
//     storageService.store(STORAGE_KEY, user)
//     return user
// }







// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'
const SCORE_FOR_REVIEW = 10

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    increaseScore
}

window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get('user', userId)
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser()
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _handleLogin(user)

    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

