
exports.up = async function(knex) {
  await knex.schema.table('answer', (table) => {
      table.boolean('accepted').defaultTo(false)
  })
};

exports.down = async function(knex) {
  
};
