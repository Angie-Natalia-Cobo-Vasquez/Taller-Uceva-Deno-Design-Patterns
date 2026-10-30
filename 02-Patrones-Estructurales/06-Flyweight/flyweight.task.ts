/**
 * Patrón Flyweight (Peso ligero): comparte objetos con información repetida
 * para reducir la cantidad de instancias necesarias.
 * En el mapa universitario, muchos lugares pueden usar el mismo icono; la fábrica
 * reutiliza los datos del icono y cada lugar conserva sus coordenadas propias.
 * Es adecuado cuando se repite el estado del icono entre muchas ubicaciones.
 * Referencia: https://refactoring.guru/es/design-patterns/flyweight
 */

interface Coordinates {
  x: number;
  y: number;
}

class MapIcon {
  private type: string;
  private symbol: string;

  constructor(type: string, symbol: string) {
    this.type = type;
    this.symbol = symbol;
  }

  displayPlace(name: string, coordinates: Coordinates): void {
    console.log(
      `${name}: tipo ${this.type}, icono ${this.symbol}, coordenadas (${coordinates.x}, ${coordinates.y})`,
    );
  }
}

class MapIconFactory {
  private icons: Record<string, MapIcon> = {};

  getIcon(type: string, symbol: string): MapIcon {
    const key = type;

    if (!this.icons[key]) {
      console.log(`Creando icono compartido para: ${type}`);
      this.icons[key] = new MapIcon(type, symbol);
    } else {
      console.log(`Reutilizando icono compartido para: ${type}`);
    }

    return this.icons[key];
  }
}

class UniversityPlace {
  private name: string;
  private coordinates: Coordinates;
  private icon: MapIcon;

  constructor(name: string, x: number, y: number, icon: MapIcon) {
    this.name = name;
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display(): void {
    this.icon.displayPlace(this.name, this.coordinates);
  }

  getIcon(): MapIcon {
    return this.icon;
  }
}

function main(): void {
  const factory = new MapIconFactory();
  const libraryIcon = factory.getIcon('Biblioteca', '[B]');
  const cafeteriaIcon = factory.getIcon('Cafetería', '[C]');

  const places = [
    new UniversityPlace('Biblioteca central', 12, 8, libraryIcon),
    new UniversityPlace('Biblioteca de idiomas', 30, 14, factory.getIcon('Biblioteca', '[B]')),
    new UniversityPlace('Cafetería principal', 20, 25, cafeteriaIcon),
    new UniversityPlace('Cafetería de ingeniería', 42, 18, factory.getIcon('Cafetería', '[C]')),
    new UniversityPlace('Laboratorio de química', 50, 40, factory.getIcon('Laboratorio', '[L]')),
  ];

  console.log('\nLugares del mapa:');
  places.forEach((place) => place.display());

  console.log(
    `\n¿Las dos bibliotecas comparten el mismo icono? ${places[0].getIcon() === places[1].getIcon()}`,
  );
  console.log(
    `¿Las cafeterías comparten el mismo icono? ${places[2].getIcon() === places[3].getIcon()}`,
  );
}

main();