const { EntitySchema } = require('typeorm');

const Promotion = new EntitySchema({
  name: 'Promotion',
  tableName: 'promotions',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    discount_percentage: {
      type: 'decimal',
      precision: 5,
      scale: 2,
    },
    start_date: {
      type: 'date',
    },
    end_date: {
      type: 'date',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});

module.exports = {
  Promotion,
};