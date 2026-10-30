/**
 * Patrón Adapter (Adaptador): convierte la interfaz de una clase existente en
 * otra que el cliente espera.
 * Este ejemplo integra un inventario antiguo cuyos nombres de método y campos
 * no coinciden con la interfaz de la aplicación. El adaptador es adecuado porque
 * permite reutilizar ese sistema sin cambiar su código original.
 * Referencia: https://refactoring.guru/es/design-patterns/adapter
 */

export {};

interface InventoryItem {
  code: string;
  name: string;
  quantity: number;
}

interface InventoryService {
  findItem(code: string): InventoryItem | undefined;
}

interface LegacyInventoryRecord {
  codigoArticulo: string;
  descripcionArticulo: string;
  unidadesDisponibles: number;
}

class OldInventorySystem {
  private records: LegacyInventoryRecord[] = [
    {
      codigoArticulo: 'LAB-204',
      descripcionArticulo: 'Cable HDMI',
      unidadesDisponibles: 18,
    },
    {
      codigoArticulo: 'LAB-310',
      descripcionArticulo: 'Adaptador USB-C',
      unidadesDisponibles: 7,
    },
  ];

  // El sistema antiguo utiliza un nombre de método y campos diferentes.
  consultarArticulo(codigo: string): LegacyInventoryRecord | undefined {
    return this.records.find((record) => record.codigoArticulo === codigo);
  }
}

class InventoryAdapter implements InventoryService {
  private oldInventory: OldInventorySystem;

  constructor(oldInventory: OldInventorySystem) {
    this.oldInventory = oldInventory;
  }

  findItem(code: string): InventoryItem | undefined {
    const oldRecord = this.oldInventory.consultarArticulo(code);

    if (!oldRecord) {
      return undefined;
    }

    return {
      code: oldRecord.codigoArticulo,
      name: oldRecord.descripcionArticulo,
      quantity: oldRecord.unidadesDisponibles,
    };
  }
}

function main(): void {
  const oldInventory = new OldInventorySystem();
  const inventory: InventoryService = new InventoryAdapter(oldInventory);
  const requestedCode = 'LAB-204';

  console.log(`Consulta de inventario para el código ${requestedCode}:`);
  const item = inventory.findItem(requestedCode);

  if (item) {
    console.log(`Producto: ${item.name}`);
    console.log(`Código: ${item.code}`);
    console.log(`Unidades disponibles: ${item.quantity}`);
  } else {
    console.log('No se encontró el producto solicitado.');
  }
}

main();