
/**
 * Patrón Strategy (Estrategia): define una familia de algoritmos, los encapsula
 * y permite intercambiarlos sin cambiar el contexto que los utiliza.
 * Este ejemplo calcula el transporte de un pedido en bicicleta, motocicleta o
 * automóvil. Es adecuado porque cada tarifa tiene una fórmula propia y la orden
 * puede cambiar de método sin incluir esas fórmulas en su lógica.
 * Referencia: https://refactoring.guru/es/design-patterns/strategy
 */

interface TransportStrategy {
  calculateCost(distanceKm: number): number;
}

class BicycleStrategy implements TransportStrategy {
  calculateCost(distanceKm: number): number {
    return distanceKm * 1000;
  }
}

class MotorcycleStrategy implements TransportStrategy {
  calculateCost(distanceKm: number): number {
    return 1200 + distanceKm * 1500;
  }
}

class CarStrategy implements TransportStrategy {
  calculateCost(distanceKm: number): number {
    return 3500 + distanceKm * 2500;
  }
}

class DeliveryOrder {
  private description: string;
  private distanceKm: number;
  private strategy: TransportStrategy;

  constructor(
    description: string,
    distanceKm: number,
    strategy: TransportStrategy,
  ) {
    this.description = description;
    this.distanceKm = distanceKm;
    this.strategy = strategy;
  }

  setStrategy(strategy: TransportStrategy): void {
    this.strategy = strategy;
  }

  calculateDeliveryCost(): number {
    return this.strategy.calculateCost(this.distanceKm);
  }

  displayCost(transportName: string): void {
    const cost = this.calculateDeliveryCost();
    console.log(
      `${this.description} (${this.distanceKm} km) en ${transportName}: $${cost.toLocaleString('es-CO')} COP`,
    );
  }
}

function main(): void {
  const order = new DeliveryOrder(
    'Pedido de materiales de clase',
    6,
    new BicycleStrategy(),
  );

  order.displayCost('bicicleta');

  order.setStrategy(new MotorcycleStrategy());
  order.displayCost('motocicleta');

  order.setStrategy(new CarStrategy());
  order.displayCost('automóvil');

  console.log(
    '\nLa orden usa la misma operación para calcular el costo; cada estrategia aporta su propia tarifa.',
  );
}

main();