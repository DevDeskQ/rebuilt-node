exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
       table.increments('id');
       table.string('username').unique().notNullable();
       table.string('password').notNullable();
       table.string('email').notNullable();
       table.string('role').defaultTo('student');
       table.text('bio');
    });
    await knex.schema.createTable('categories', (table) => {
       table.increments('id');
       table.string('title');
    });
    await knex.schema.createTable('ticket', (table) => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('tried').notNullable();
        table.string('status').defaultTo('open')
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
    await knex.schema.createTable('answer', (table) => {
        table.increments('id');
        table.string('answer').notNullable();
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('ticket_id')
            .references('id')
            .inTable('ticket')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
    await knex.schema.createTable('ticket_category', (table) => {
       table.integer('ticket_id')
           .references('id')
           .inTable('ticket')
           .onUpdate('CASCADE')
           .onDelete('CASCADE');
       table.integer('category_id')
           .references('id')
           .inTable('categories')
           .onUpdate('CASCADE')
           .onDelete('CASCADE');
       table.primary(['ticket_id', 'category_id']);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('ticket_category');
    await knex.schema.dropTableIfExists('answer');
    await knex.schema.dropTableIfExists('ticket');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('users');
};
