exports.seed = async function(knex) {
    await knex("users").insert([
        {
            username: 'joe',
            password: '123',
            email: 'bmo@gmail.com'
        },
        {
            username: 'bob',
            password: '321',
            email: 'bob@gmail.com'
        }
    ])
};
