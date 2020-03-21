exports.seed = async function(knex) {
    await knex("ticket_category").insert([
        { ticket_id: 1, category_id: 24 },
        { ticket_id: 1, category_id: 26 },
        { ticket_id: 2, category_id: 5 },
        { ticket_id: 2, category_id: 6 },
        { ticket_id: 3, category_id: 41 },
        { ticket_id: 4, category_id: 34 }
    ])
};
