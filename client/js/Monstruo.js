import { Personaje } from "./Personaje.js";
export class Monstruo extends Personaje {
  constructor(id, nombre, tipo, alias, miedo, defensa) {
    super(id, nombre, tipo);
    this.alias = alias;
    this.miedo = miedo;
    this.defensa = defensa;
  }
}

export const CargarAtributos = (obj, key, value) => {
  switch (key) {
    case "id":
      obj.id = value;
      break;
    case "nombre":
      obj.nombre = value;
      break;
    case "tipo":
      obj.tipo = value;
      break;
    case "alias":
      obj.alias = value;
      break;
    case "miedo":
      obj.miedo = value;
      break;
    case "defensa":
      obj.defensa = value;
      break;
  }
};
