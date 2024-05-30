class Object {
  constructor(id, nombre, tipo, sprite, descripcion, stats) {
    (this.id = id),
    (this.nombre = nombre),
    (this.tipo = tipo),
    (this.sprite = sprite),
    (this.descripcion = descripcion),
    (this.stats = stats);
  }
}

class Stat {
  constructor(nombre, valor) {
    (this.nombre = nombre),
    (this.valor = valor);
  }
}

export { Object, Stat };