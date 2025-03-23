const { EntitySchema } = require('typeorm');

const Reservation = new EntitySchema({
  name: 'Reservation',
  tableName: 'reservations',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    pickup_location: {
      type: 'varchar',
    },
    dropoff_location: {
      type: 'varchar',
    },
    pickup_datetime: {
      type: 'timestamp',
    },
    dropoff_datetime: {
      type: 'timestamp',
    },
    total_cost: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    payment_status: {
      type: 'varchar',
      default: 'Pending',
    },
    reservation_status: {
      type: 'varchar',
      default: 'Confirmed',
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
    payment: {
      target: 'Payment',
      type: 'one-to-one',
      mappedBy: 'reservation',
    },
  },
});

module.exports = {
  Reservation,
};
