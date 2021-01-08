const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addToy, getToys, deleteToy,updateToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.post('/', addToy)
router.delete('/:id', deleteToy)
router.put('/:id', updateToy)

module.exports = router