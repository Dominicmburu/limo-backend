const { EntitySchema } = require('typeorm');

const Payment = new EntitySchema({
  name: 'Payment',
  tableName: 'payments',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    amount: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    payment_method: {
      type: 'varchar',
    },
    payment_status: {
      type: 'varchar',
      default: 'Pending',
    },
    transaction_id: {
      type: 'varchar',
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
    reservation: {
      target: 'Reservation',
      type: 'one-to-one',
      joinColumn: { name: 'reservation_id' },
      inverseSide: 'payment',
    },
  },
});

module.exports = {
  Payment,
};
