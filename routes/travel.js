const express = require('express');
const router = express.Router();
const travelCtrl = require('../controllers/travel');

router.get('/:id', travelCtrl.getOne);
router.post('/', travelCtrl.create);
router.get('/', travelCtrl.getAll);

module.exports = router;