const express = require('express');
const router = express.Router();
const countryCtrl = require('../controllers/country');

router.get('/:id', countryCtrl.getOne);
router.post('/', countryCtrl.create);
router.get('/', countryCtrl.getAll);

module.exports = router;