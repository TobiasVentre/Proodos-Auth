# Tests

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
