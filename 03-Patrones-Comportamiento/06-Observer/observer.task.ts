/**
 * Patrón Observer (Observador): define una relación de uno a muchos para que
 * un sujeto notifique a sus observadores cuando ocurre un evento.
 * En este ejemplo, los estudiantes suscritos reciben los avisos académicos que
 * publica el sistema. Es adecuado porque el publicador no necesita conocer los
 * detalles de cada estudiante y notifica únicamente a quienes están suscritos.
 * Referencia: https://refactoring.guru/es/design-patterns/observer
 */

export {};

interface Observer {
  update(notice: string): void;
}

class AcademicNoticeBoard {
  private subscribers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log('Estudiante suscrito a los avisos académicos.');
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== observer,
    );
    console.log('Estudiante retirado de la lista de suscriptores.');
  }

  publishNotice(notice: string): void {
    console.log(`\nNuevo aviso académico: ${notice}`);

    // El tablero notifica a los observadores registrados, sin depender de sus clases concretas.
    for (const subscriber of this.subscribers) {
      subscriber.update(notice);
    }
  }
}

class Student implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(notice: string): void {
    console.log(`${this.name} recibió el aviso: ${notice}`);
  }
}

function main(): void {
  const noticeBoard = new AcademicNoticeBoard();
  const angie = new Student('Angie');
  const santiago = new Student('Santiago');
  const valentina = new Student('Valentina');

  noticeBoard.subscribe(angie);
  noticeBoard.subscribe(santiago);
  noticeBoard.subscribe(valentina);

  noticeBoard.publishNotice('Inscripciones de asignaturas hasta el viernes.');

  noticeBoard.unsubscribe(santiago);
  noticeBoard.publishNotice('La asesoría de proyecto será en el bloque B.');
}

main();