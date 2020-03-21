exports.seed = async function(knex) {
    await knex("answer").insert([
        {
            answer: 'need to define state',
            user_id: 1
        },
        {
            answer: 'check what the parent of the flex unit is',
            user_id: 1
        },
        {
            answer: 'need to search the database for the users id',
            user_id: 2
        },
        {
            answer: 'need to build an instance of useEffect',
            user_id: 2
        }
    ])
};
