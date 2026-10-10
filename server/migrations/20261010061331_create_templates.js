exports.up = function (knex) {
  return knex.schema.createTable('templates', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.string('thumbnail_url');
    table.string('category');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('templates');
};