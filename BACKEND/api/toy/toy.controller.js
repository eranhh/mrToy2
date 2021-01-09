const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const toyService = require('./toy.service')

async function getToys(req, res) {
    try {
        const filterBy = {
            name:req.query?.name||'',
            type: req.query?.type||'',
            inStock: req.query?.inStock||''
        }
        console.log('filterBy', filterBy)
        // const toys = await toyService.query(req.query)
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Cannot get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}


async function updateToy(req, res) {
    try {
        const toy = req.body
        console.log('toy', toy)
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
        console.log('savedtoy', savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

async function addToy(req, res) {
    try {
        var toy = req.body
        console.log('toy IS:', toy)
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