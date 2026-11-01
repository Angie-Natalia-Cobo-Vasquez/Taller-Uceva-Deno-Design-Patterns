/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * Problema: un vehículo y su motor deben pertenecer a la misma familia
 * tecnológica para evitar combinaciones incompatibles.
 * Solución: cada fábrica crea la familia eléctrica o la familia de combustión,
 * mientras el cliente depende únicamente de las interfaces de los productos.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from '../../helpers/colors.ts';

// 1. Interfaces de Vehicle y Engine
interface Vehicle {
  assemble(): void;
}

interface Engine {
  start(): void;
}

// 2. Clases Concretas de Productos

class ElectricCar implements Vehicle {
  assemble(): void {
    console.log('Ensamblando un auto %celéctrico', COLORS.blue);
  }
}

class GasCar implements Vehicle {
  assemble(): void {
    console.log('Ensamblando un auto de %ccombustión', COLORS.brown);
  }
}

class ElectricEngine implements Engine {
  start(): void {
    console.log('Arrancando motor %celéctrico', COLORS.blue);
  }
}

class GasEngine implements Engine {
  start(): void {
    console.log('Arrancando motor de %ccombustión', COLORS.brown);
  }
}

interface VehicleFactory {
  createVehicle(): Vehicle;
  createEngine(): Engine;
}

class ElectricVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new ElectricCar();
  }
  createEngine(): Engine {
    return new ElectricEngine();
  }
}

class GasVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new GasCar();
  }
  createEngine(): Engine {
    return new GasEngine();
  }
}

function assembleVehicleFamily(factory: VehicleFactory): void {
  const vehicle = factory.createVehicle();
  const engine = factory.createEngine();

  vehicle.assemble();
  engine.start();
}

function main(): void {
  console.log('Creando familia de vehículo eléctrico:');
  assembleVehicleFamily(new ElectricVehicleFactory());

  console.log('\nCreando familia de vehículo de combustión:');
  assembleVehicleFamily(new GasVehicleFactory());
}

main();