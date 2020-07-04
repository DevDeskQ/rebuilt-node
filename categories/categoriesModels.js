const db = require('../data/config');

module.exports = {
    getAll
}

async function getAll() {
    try {
        return await db('categories')

    } catch (e) {
        console.log(e)
    }
}