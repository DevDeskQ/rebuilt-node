exports.seed = async function(knex) {
    await knex("ticket_answer").insert([
        { ticket_id: 1, answer_id: 4 },
        { ticket_id: 2, answer_id: 2 },
        { ticket_id: 3, answer_id: 3 },
        { ticket_id: 4, answer_id: 1 }
    ])
};
