exports.up = function (knex) {
  return knex.schema.alterTable('templates', (table) => {
    table.decimal('price', 8, 2).notNullable().defaultTo(0);
    table.text('features'); // stored as a JSON array string
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('templates', (table) => {
    table.dropColumn('price');
    table.dropColumn('features');
  });
};
