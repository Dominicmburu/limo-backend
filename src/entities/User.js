const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password_hash: {
      type: 'varchar',
    },
    phone_number: {
      type: 'varchar',
    },
    address: {
      type: 'varchar',
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
    reservations: {
      target: 'Reservation', 
      type: 'one-to-many',
      inverseSide: 'user', 
      cascade: true,
    },
    reviews: {
      target: 'Review', 
      type: 'one-to-many',
      inverseSide: 'user', 
      cascade: true,
    },
  },
});

module.exports = {
  User,
};
