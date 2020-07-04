const express = require('express');
const restrict = require('../middleware/restrict');
const helpers = require('./categoriesModels')

const router = express.Router();

router.get('/', restrict(), async (req, res, next) => {
    try {
        const cats = await helpers.getAll();
        res.status(200).json(cats)
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;