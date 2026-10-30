# TALLER PATRONES DE DISEÑO

**Asignatura:** ARQUITECTURA DE SOFTWARE
**Institución:** Unidad Central del Valle del Cauca (UCEVA)
**Integrantes:** Angie Natalia Cobo Vásquez y Santiago Ospina González

## Lenguaje y entorno

Los ejercicios están escritos en TypeScript y se ejecutan con Deno. Cada archivo `*.task.ts` incluye su propio `main()` y se puede ejecutar de forma independiente desde la carpeta del patrón.

## Patrones del trabajo

### Desarrollados por Angie

Patrones obligatorios:

1. **Builder:** construcción paso a paso de reservas de eventos, con servicios adicionales opcionales.
2. **Adapter:** consulta de inventario antiguo a través de una interfaz común para la aplicación.
3. **Flyweight:** reutilización de iconos de lugares universitarios, manteniendo las coordenadas de cada lugar por separado.
4. **Observer:** publicación de avisos académicos para estudiantes suscritos, incluyendo la baja de un suscriptor.

Patrón adicional seleccionado:

5. **Strategy (comportamiento):** cálculo del costo de un pedido con estrategias intercambiables de bicicleta, motocicleta y automóvil.


## Estructura

```text
01-Patrones-Creacionales/
└── 01-Builder/
	└── builder.task.ts
02-Patrones-Estructurales/
├── 01-Adapter/
│   └── adapter.task.ts
└── 06-Flyweight/
	└── flyweight.task.ts
03-Patrones-Comportamiento/
├── 06-Observer/
│   └── observer.task.ts
└── 08-Strategy/
	└── strategy.task.ts
helpers/
└── colors.ts
```

Las carpetas y los archivos demostrativos existentes del repositorio de referencia se conservan. Los ejercicios de esta entrega se implementan en los archivos `*.task.ts`, sin duplicar los ejemplos en archivos adicionales.

## Ejecución

Instala Deno y, desde la raíz del repositorio, cambia a la carpeta indicada y ejecuta el archivo. Por ejemplo, para Builder:

```powershell
cd 01-Patrones-Creacionales/01-Builder
deno run builder.task.ts
```

Comandos de los cinco ejercicios:

```powershell
cd 01-Patrones-Creacionales/01-Builder
deno run builder.task.ts

cd ../../02-Patrones-Estructurales/01-Adapter
deno run adapter.task.ts

cd ../06-Flyweight
deno run flyweight.task.ts

cd ../../03-Patrones-Comportamiento/06-Observer
deno run observer.task.ts

cd ../08-Strategy
deno run strategy.task.ts
```

Para volver a ejecutar automáticamente al detectar cambios, agrega `--watch` al comando de Deno, por ejemplo `deno run --watch builder.task.ts`.

## Repositorio de entrega

[Taller-Uceva-Deno-Design-Patterns](https://github.com/Angie-Natalia-Cobo-Vasquez/Taller-Uceva-Deno-Design-Patterns)

## Referencias

- [Repositorio de referencia del profesor](https://github.com/Brejcha13320/Uceva-Deno-Design-Patterns)
- [Catálogo de patrones de Refactoring Guru](https://refactoring.guru/es/design-patterns/catalog)