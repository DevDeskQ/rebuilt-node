const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helpers = require('../users/usersModel');

const router = express.Router();

router.post('/register', async (req, res, next) => {
   try {
       console.log(req.body);
       const { username } = req.body;
       const user = await helpers.findBy({ username }).first();

       if (user) {
           return res.status(409).json({
               errorMessage: 'Username is alread take'
           })
       }

       res.status(201).json(await helpers.add(req.body));

   } catch (e) {
       next(e)
   }
});

router.post('/login', async (req, res, next) => {
    const authError = {
        errorMessage: 'Invalid Credentials'
    };

    try {
        const { username, password } = req.body;
console.log(1);
        const user = await helpers.findBy({ username }).first();
            if (!user) {
                return res.status(401).json(authError);
            }
console.log(2);
        const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(401).json(authError)
            }
console.log(3);
        const payload = {
                userId: user.id,
                username: user.username,
                email: user.email
        };

        const token =jwt.sign(payload, process.env.JWT_KEYCODE);
            res.cookie('token', token);

        res.json({
            message: `Welcome ${user.username}`
        });
   } catch (e) {
       next(e)
   }
});

module.exports = router;
