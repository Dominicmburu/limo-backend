const { EntitySchema } = require('typeorm');

const Vehicle = new EntitySchema({
  name: 'Vehicle',
  tableName: 'vehicles',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      default: 'Vehicle',
    },
    image: {
      type: 'varchar',
      nullable: true,
    },
    description: {
      type: 'text',
      nullable: true,
    },
    capacity: {
      type: 'varchar',
      nullable: true,
    },
    fuelType: {
      type: 'varchar',
      nullable: true,
    },
    transmission: {
      type: 'varchar',
      nullable: true,
    },
    category: {
      type: 'varchar',
      nullable: true,
    },
    features: {
      type: 'simple-array',
      nullable: true, 
    },
    make: {
      type: 'varchar',
    },
    model: {
      type: 'varchar',
    },
    year: {
      type: 'int',
    },
    license_plate: {
      type: 'varchar',
      unique: true,
    },
    vehicle_type: {
      type: 'varchar',
      nullable: true,
    },
    availability_status: {
      type: 'boolean',
      default: true,
    },
    price_per_hour: {
      type: 'decimal',
      precision: 10,
      scale: 2,
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
      inverseSide: 'vehicle',
    },
    reviews: {
      target: 'Review',
      type: 'one-to-many',
      inverseSide: 'vehicle',
    },
  },
});

module.exports = {
  Vehicle,
};
