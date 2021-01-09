const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    return user
}

async function signup(email, firstName, lastName, username, password) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${firstName + ' ' + lastName}`)
    if (!email || !firstName || !lastName || !username || !password) return Promise.reject('fullname, email, username and password are required!')

    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, firstName, lastName, username, password: hash })
}

module.exports = {
    signup,
    login,
}