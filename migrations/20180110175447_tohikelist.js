
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tohikelist', function(table){
    table.increments()
    table.integer('users_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
    table.integer('hike_id').notNullable()
    table.varchar('hike_name', 255).notNullable()
    table.varchar('img_thumbnail', 255)
    table.timestamps(true, true)
  });

  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tohikelist')
  };
