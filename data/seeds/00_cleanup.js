exports.seed = async function(knex) {
    await knex('ticket_answer').truncate();
    await knex('ticket_category').truncate();
    await knex('answer').truncate();
    await knex('ticket').truncate();
    await knex('categories').truncate();
    await knex('users').truncate();
};

