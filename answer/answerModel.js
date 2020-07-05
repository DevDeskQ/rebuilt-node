const db = require('../data/config');

module.exports = {
    createAns,
    updateAns,
    delAns,
    getAns,
    getById
}

async function createAns(data) {
    try {
        return await db('answer').insert(data)
    } catch (e) {
        console.log(e)
    }
}

async function updateAns(id, data) {
    try {
        return await db('answer')
            .where('id', id)
            .update(data)
    } catch (e) {
        console.log(e)
    }
}

async function delAns(id) {
    try {
        return await db('answer')
            .where('id', id)
            .del();
    } catch (e) {
        console.log(e)
    }
}

async function getAns(id) {
    try {
        return await db('answer')
            .where('ticket_id', id)
            .select('*')
    } catch (e) {
        console.log(e)
    }
}

async function getById(id) {
    try {
        return await db('answer')
            .where('id', id)
            .select('*')
            .first();
    } catch (e) {
        console.log(e)
    }
}
