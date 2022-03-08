const express = require('express');
const router = express.Router();
const periodCtrl = require('../controllers/period');

router.get('/:id', periodCtrl.getOne);
router.post('/', periodCtrl.create);
router.get('/', periodCtrl.getAll);

module.exports = router;