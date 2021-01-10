const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    // const criteria = {}
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        // users = users.map(user => {
        //     delete user.password
        //     user.isHappy = true
        //     user.createdAt = ObjectId(user._id).getTimestamp()
        //     // Returning fake fresh data
        //     // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
        //     return user
        // })
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function remove(toyId) {
    console.log('toy is:', toyId)
    // logger.info('toy is:', toyId)
    try {
        // console.log('toy is:', toyId)
        // logger.info('toy is:', toyId)
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    console.log('toy is:', toy)
    console.log(ObjectId(toy._id))
    try {
        // console.log('toy is:', toy)
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            type: toy.type,
            price: toy.price,
            inStock: toy.inStock,
            createdAt: toy.createdAt
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    console.log('toy is:', toy)
    // logger.info('toy is:', toy)
    try {
        // console.log('toy is:', toy)
        // logger.info('toy is:', toy)
        // peek only updatable fields!
        const toyToAdd = {
            name: toy.name,
            type: toy.type,
            price: toy.price,
            inStock: toy.inStock,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const nameCriteria = {
            $regex: filterBy.name, $options: 'i'
        }
        criteria.name = nameCriteria
    }
    if (filterBy.type && filterBy.type !== 'All') {
        const typeCriteria = {
            $regex: filterBy.type, $options: 'i'
        }
        criteria.type = typeCriteria
    }
    if (filterBy.inStock) {
        criteria.inStock = filterBy.inStock
    // if (filterBy.inStock) {
    //     filterBy.inStock = (filterBy.inStock === 'false')
    //     const inStockCriteria = { $ne: filterBy.inStock }
    //     criteria.inStock = inStockCriteria
    }
    console.log('criteria', criteria)
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    update
}