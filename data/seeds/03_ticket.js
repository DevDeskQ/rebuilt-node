exports.seed = async function(knex) {
    await knex("ticket").insert([
        {
            title: 'React Hooks',
            description: 'trying to make a custom hook',
            tried: 'reading the docs, and watching videos',
            status: "open",
            user_id: 1
        },
        {
            title: 'CSS',
            description: 'flexbox hell',
            tried: 'can not get items to line up',
            status: "resolved",
            user_id: 1
        },
        {
            title: 'express middle',
            description: 'trying to validate user',
            tried: 'everything I can think of',
            user_id: 2
        },
        {
            title: 'redux',
            description: 'setting up reducers',
            tried: 'to break out all user types',
            user_id: 2
        }
    ])
};
