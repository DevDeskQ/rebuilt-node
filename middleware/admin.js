function admin() {
    return async (req, res, next) => {
        try {
            if (req.token.username === 'admin') {
                next()
            } else {
                res.status(403).json({
                    errorMessage: 'You are not authorzied'
                })
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = admin;
