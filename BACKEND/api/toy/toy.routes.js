const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addToy, getToys, deleteToy, updateToy } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',log, getToys)
router.post('/',requireAuth, requireAdmin, addToy)
router.delete('/:id',requireAuth, requireAdmin, deleteToy)
router.put('/:id',requireAuth, requireAdmin, updateToy)

module.exports = router