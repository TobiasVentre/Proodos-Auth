# Tests

## Objetivo

Este proyecto contiene los tests unitarios del MS en un paquete separado, con compilación aislada en `Tests/dist` para evitar mezclar archivos `.ts` y `.js`.

## Convenciones

Todos los tests deben seguir el paradigma **AAA** (Arrange, Act, Assert) con comentarios explícitos.

Ejemplo:

```ts
// Arrange
const input = 1;

// Act
const result = sum(input);

// Assert
expect(result).toBe(2);
```

## Comandos

- `npm run build --workspace Tests`: transpila tests TypeScript a `Tests/dist`.
- `npm run test --workspace Tests`: ejecuta los tests.
- `npm run test:coverage --workspace Tests`: ejecuta tests con cobertura.

## Coverage con UI HTML

Después de correr `test:coverage`, abrir:

- `Tests/coverage/lcov-report/index.html`

El reporte incluye vista por archivo, líneas cubiertas, branches y funciones.
