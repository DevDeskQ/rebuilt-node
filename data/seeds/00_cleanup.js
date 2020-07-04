exports.seed = async function(knex) {
    function pgTruncate(table) {
        return knex.raw('TRUNCATE TABLE ?? START IDENTITY CASCADE', table)
    }
    return await knex('ticket_category').truncate();
    await pgTruncate('answer');
    await pgTruncate('ticket');
    await pgTruncate('categories');
    await pgTruncate('users');
};

