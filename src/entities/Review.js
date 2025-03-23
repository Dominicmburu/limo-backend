const { EntitySchema } = require('typeorm');

const Review = new EntitySchema({
  name: 'Review',
  tableName: 'reviews',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    rating: {
      type: 'int',
      nullable: false,
    },
    comment: {
      type: 'text',
      nullable: true,
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
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
    },
    vehicle: {
      target: 'Vehicle',
      type: 'many-to-one',
      joinColumn: { name: 'vehicle_id' },
      onDelete: 'CASCADE',
    },
  },
});

module.exports = {
  Review,
};
