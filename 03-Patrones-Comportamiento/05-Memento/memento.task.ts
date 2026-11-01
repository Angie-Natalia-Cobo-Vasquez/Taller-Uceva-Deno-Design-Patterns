/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * Problema: una pizarra debe permitir deshacer cambios sin exponer ni alterar
 * directamente su estado interno desde el historial.
 * Solución: DrawingMemento guarda copias del estado y History las administra,
 * permitiendo restaurar versiones anteriores de DrawingBoard.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from '../../helpers/colors.ts';

class DrawingMemento {
  private shapes: string[];

  constructor(shapes: string[]) {
    // Guardamos una copia de las figuras para evitar mutaciones
    this.shapes = [...shapes];
  }

  getShapes(): string[] {
    return [...this.shapes];
  }
}

// Clase Originator - DrawingBoard
class DrawingBoard {
  private shapes: string[] = [];

  // Agregar una figura a la pizarra
  addShape(shape: string): void {
    this.shapes.push(shape);
    console.log(`Figura agregada: ${shape}`);
  }

  // Mostrar el estado actual de la pizarra
  showBoard(): void {
    console.log('Pizarra actual:', this.shapes.join(', ') || 'Vacía');
  }

  save(): DrawingMemento {
    return new DrawingMemento(this.shapes);
  }

  // Restaurar el estado de la pizarra desde un Memento
  restore(memento: DrawingMemento): void {
    this.shapes = memento.getShapes();
    console.log('%c\nEstado de la pizarra restaurado.', COLORS.blue);
  }
}

// Clase Caretaker - History
class History {
  private mementos: DrawingMemento[] = [];

  push(memento: DrawingMemento): void {
    this.mementos.push(memento);
  }

  pop(): DrawingMemento | undefined {
    return this.mementos.pop();
  }
}

// Código Cliente para probar el patrón Memento

function main(): void {
  const drawingBoard = new DrawingBoard();
  const history = new History();

  // El usuario agrega figuras y guarda el estado en cada paso
  drawingBoard.addShape('Círculo');
  history.push(drawingBoard.save());

  drawingBoard.addShape('Cuadrado');
  history.push(drawingBoard.save());

  drawingBoard.addShape('Triángulo');
  drawingBoard.showBoard(); // Mostrar estado actual de la pizarra

  // Deshacer el último cambio
  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard(); // Mostrar estado después de deshacer

  // Deshacer otro cambio
  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard(); // Mostrar estado después de deshacer nuevamente
}

main();