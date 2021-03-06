const logger = require('../../services/logger.service')
const toyService = require('./toy.service')
// const userService = require('../user/user.service')

async function getToys(req, res) {
    const { name, type, inStock } = req.query
    const filterBy = {
        name: name || '',
        type: type || '',
        inStock: inStock==='true',
        // price: +price || 0
    } 
    console.log('filterBy', filterBy)
    try {
        // const toys = await toyService.query(req.query)
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Cannot get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function deleteToy(req, res) {
    const toyId = req.params.id
    try {
        await toyService.remove(toyId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
        console.log('savedtoy', savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

async function addToy(req, res) {
    try {
        var toy = req.body
        // toy.byUserId = req.session.user._id
        toy = await toyService.add(toy)
        // toy.byUser = req.session.user
        // toy.aboutUser = await userService.getById(toy.aboutUserId)
        res.send(toy)

    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

module.exports = {
    getToys,
    deleteToy,
    addToy,
    updateToy
}