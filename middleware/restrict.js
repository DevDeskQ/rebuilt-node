const jwt = require('jsonwebtoken');

function restrict() {
    const authError = {
        errorMessage: 'Invalid credentials'
    };

    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
                if (!token) {
                    return res.status(401).json(authError)
                }
            jwt.verify(token, process.env.JWT_KEYCODE, (err) => {
               if (err) {
                   return res.status(401).json(authError)
               }
            });
                next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = restrict;
