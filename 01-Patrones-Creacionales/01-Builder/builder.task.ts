/**
 * Patrón Builder (Constructor): permite crear un objeto paso a paso y separar
 * su construcción de la representación final.
 * En este ejemplo resuelve la creación de reservas de eventos con datos y
 * servicios opcionales. Es adecuado porque cada reserva puede combinar
 * opciones distintas sin crear un constructor diferente para cada combinación.
 * Referencia: https://refactoring.guru/es/design-patterns/builder
 */

export {};

class EventReservation {
  private eventName: string;
  private date: string;
  private venue: string;
  private services: string[];

  constructor(eventName: string, date: string, venue: string, services: string[]) {
    this.eventName = eventName;
    this.date = date;
    this.venue = venue;
    this.services = services;
  }

  displayDetails(): void {
    const additionalServices = this.services.length > 0
      ? this.services.join(', ')
      : 'Ninguno';

    console.log(`Evento: ${this.eventName}`);
    console.log(`Fecha: ${this.date}`);
    console.log(`Lugar: ${this.venue}`);
    console.log(`Servicios adicionales: ${additionalServices}\n`);
  }
}

class EventReservationBuilder {
  private eventName = '';
  private date = '';
  private venue = '';
  private services: string[] = [];

  setEventName(eventName: string): EventReservationBuilder {
    this.eventName = eventName;
    return this;
  }

  setDate(date: string): EventReservationBuilder {
    this.date = date;
    return this;
  }

  setVenue(venue: string): EventReservationBuilder {
    this.venue = venue;
    return this;
  }

  addService(service: string): EventReservationBuilder {
    this.services.push(service);
    return this;
  }

  // El mismo proceso de construcción permite incluir o no servicios opcionales.
  build(): EventReservation {
    return new EventReservation(
      this.eventName,
      this.date,
      this.venue,
      [...this.services],
    );
  }
}

function main(): void {
  const academicConference = new EventReservationBuilder()
    .setEventName('Encuentro de Ingeniería de Software')
    .setDate('15 de noviembre de 2026')
    .setVenue('Auditorio UCEVA')
    .addService('Proyección')
    .addService('Refrigerio')
    .build();

  const studentWorkshop = new EventReservationBuilder()
    .setEventName('Taller de prototipado')
    .setDate('22 de noviembre de 2026')
    .setVenue('Sala de innovación')
    .build();

  console.log('Reserva 1:');
  academicConference.displayDetails();

  console.log('Reserva 2:');
  studentWorkshop.displayDetails();
}

main();