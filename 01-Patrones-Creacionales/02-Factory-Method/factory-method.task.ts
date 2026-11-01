/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * Problema: el sistema necesita generar reportes de distintos tipos sin que
 * el código cliente conozca las clases concretas de cada reporte.
 * Solución: cada fábrica decide qué reporte crear y el cliente trabaja con
 * la interfaz Report. Así se pueden agregar nuevos tipos sin modificar el
 * flujo general de generación.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

import { COLORS } from '../../helpers/colors.ts';

interface Report {
  generate(): void;
}

class SalesReport implements Report {
  generate(): void {
    console.log('%cGenerando reporte de ventas...', COLORS.green);
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log('%cGenerando reporte de inventario...', COLORS.orange);
  }
}

abstract class ReportFactory {
  protected abstract createReport(): Report;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

class SalesReportFactory extends ReportFactory {
  protected createReport(): Report {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  protected createReport(): Report {
    return new InventoryReport();
  }
}

function main(): void {
  const reportFactories: ReportFactory[] = [
    new SalesReportFactory(),
    new InventoryReportFactory(),
  ];

  for (const reportFactory of reportFactories) {
    reportFactory.generateReport();
  }
}

main();