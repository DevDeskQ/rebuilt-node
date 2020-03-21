const express = require('express');
const helpers = require('./usersModel');
const restrict = require('../middleware/restrict');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', restrict(), async (req, res, next) => {
   try {
       const users = await helpers.find();
       res.status(200).json(users)
   } catch (e) {
       next(e)
   }
});

router.delete('/:id', restrict(), admin(), async (req, res, next) => {
   try {
       const { id } = req.params;
       const del = await helpers.remove(id);
       res.status(204).json(id)
   } catch (e) {
       next(e)
   }
});

router.put('/:id/update', restrict(), async (req, res, next) => {
   try {
       const { id } = req.params;
       const { username, email } = req.body;

       const update = await helpers.update({username, email}, id);
       res.status(200).json(update);
   } catch (e) {
       next(e)
   }
});



module.exports = router;
