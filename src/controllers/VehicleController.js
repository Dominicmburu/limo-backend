const AppDataSource = require('../data-source');
const { Vehicle } = require('../entities/Vehicle');
const { Reservation } = require('../entities/Reservation');
const { Payment } = require('../entities/Payment');

class VehicleController {

  static async getAllVehicles(req, res, next) {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    try {
      const vehicles = await vehicleRepository.find();
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      next(error);
    }
  }


  static async getVehicleById(req, res, next) {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);
    const vehicleId = req.params.id;

    try {
      const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      res.status(200).json(vehicle);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      next(error);
    }
  }


  static async addVehicle(req, res, next) {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);
    const { name, image, description, capacity, fuelType, transmission, category, features, make, model, year, license_plate, vehicle_type, price_per_hour } = req.body;

    try {
      const existingVehicle = await vehicleRepository.findOneBy({ license_plate });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
      }

      const featuresArray = Array.isArray(features) ? features : features.split(',').map(item => item.trim());

      const vehicle = vehicleRepository.create({
        name,
        image,
        description,
        capacity,
        fuelType,
        transmission,
        category,
        features: featuresArray,
        make,
        model,
        year,
        license_plate,
        vehicle_type,
        price_per_hour,
      });
      await vehicleRepository.save(vehicle);

      res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      next(error);
    }
  }

  static async updateVehicle(req, res, next) {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);
    const vehicleId = req.params.id;
    const { make, model, year, license_plate, vehicle_type, price_per_hour, availability_status } = req.body;

    try {
      const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      if (make) vehicle.make = make;
      if (model) vehicle.model = model;
      if (year) vehicle.year = year;
      if (license_plate) vehicle.license_plate = license_plate;
      if (vehicle_type) vehicle.vehicle_type = vehicle_type;
      if (price_per_hour) vehicle.price_per_hour = price_per_hour;
      if (availability_status !== undefined) vehicle.availability_status = availability_status;

      await vehicleRepository.save(vehicle);

      res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      next(error);
    }
  }


  static async deleteVehicle(req, res, next) {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);
    const vehicleId = req.params.id;
  
    try {
      const vehicle = await vehicleRepository.findOne({
        where: { id: vehicleId },
        relations: ['reservations', 'reservations.payment'], 
      });
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      await vehicleRepository.remove(vehicle);
  
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      next(error);
    }
  }
  
  
}

module.exports = VehicleController;
