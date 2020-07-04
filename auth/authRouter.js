const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../users/usersModel');

const router = express.Router();

router.post('/register', async (req, res, next) => {
   try {
       console.log(req.body);
       const { username } = req.body;
       const user = await helpers.findBy({ username });

       if (user) {
           return res.status(409).json({
               errorMessage: 'Username is already taken'
           })
       }

       await helpers.add(req.body)
       res.status(201).json({
           message: "User Created"
       });

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

        const user = await helpers.findBy({username});
        console.log(user)
            if (!user) {
                return res.status(401).json(authError);
            }

        const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(401).json(authError)
            }

        const payload = {
                userId: user.id,
                username: user.username,
                email: user.email
        };

        const token =jwt.sign(payload, process.env.JWT_KEYCODE);

        res.json({
            message: `Welcome ${user.username}`,
            token,
            payload
        });
   } catch (e) {
       next(e)
   }
});

module.exports = router;
