const hash = require('bcryptjs');
const db = require('../data/config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

async function add(user) {
    user.password = await hash.hash(user.password, 13);
    const [ id ] = await db("users").insert(user);
    return findById(id)
}

function find() {
    return db('users').select('id', 'username', 'email');
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'email', 'password')
        .where(filter)
}

function findById(id) {
    return db('users')
        .select('id', 'username', 'email')
        .where('id', id)
        .first()
}

async function update(obj, id) {
    await db('users')
        .update(obj)
        .where('id', id);
    return findById(id)
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del()
}
