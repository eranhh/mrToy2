import { storageService } from './storageService.js'
import axios from 'axios'

const URL = 'http://localhost:3030/api/auth';
const STORAGE_KEY = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    login,
    signup,
    logout
}

// credentials strucutre: {username: '', password: ''}
function login(credentials) {
    return axios.post(`${URL}/login`, credentials)
        .then(res => res.data)
        .then(user => {
            console.log('Login success');
            return _handleLogin(user);
        })
}
// credentials strucutre: {username: '', password: '', fullname: ''}
function signup(credentials) {
    return axios.post(`${URL}/signup`, credentials)
        .then(res => res.data)
        .then(user => {
            console.log('Signup success');
            return _handleLogin(user);
        })
}
function logout() {
    return axios.post(`${URL}/logout`)
        .then(res => res.data)
        .then(() => {
            console.log('Logout success');
            storageService.clear();
        })
}

function getLoggedinUser() {
    return storageService.load(STORAGE_KEY)
}

function _handleLogin(user) {
    storageService.store(STORAGE_KEY, user)
    return user
}