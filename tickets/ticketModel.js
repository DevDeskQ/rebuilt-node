const db = require('../data/config');

module.exports = {
    getMyTickets,
    ticketCat,
    createTicket,
    findById,
    updateTicketCats,
    getAll
}

async function getMyTickets(id) {
    try {
        return await db('ticket')
            .where('user_id', id)
            .select('*')
    } catch (e) {
        console.log(e);
        return e
    }
}

async function ticketCat(id) {
    return db('ticket_category as tc')
        .join('ticket as t', 't.id', 'tc.ticket_id')
        .join('categories as c', 'c.id', 'tc.category_id')
        .where('t.id', id)
        .select('c.title');
}

async function createTicket(data) {
    try {
        const [ id ] = await db('ticket').insert(data).returning('id');
        return await db('ticket').where({ id }).first();
    } catch (e) {
        console.log(e)
    }
}

async function findById(id) {
    return db('ticket')
        .where({id: id})
        .select('*')
        .first();
}

async function updateTicketCats(tic_id, cat_id) {
    try {
        return await db('ticket_category').insert({
            ticket_id: tic_id,
            category_id: cat_id
        })
    } catch (e) {
        console.log(e)
    }
}

async function getAll() {
    try {
        return await db('ticket')
    } catch (e) {
        console.log(e)
    }
}