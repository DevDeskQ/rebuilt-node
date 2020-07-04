const hash = require('bcrypt');
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

async function findBy(filter) {
    try {
        return await db('users')
        .select('*')
        .where(filter)
        .first();
    } catch (e) {
        console.log(e)
        return e
    }
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
