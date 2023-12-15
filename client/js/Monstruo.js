import { Personaje } from "./Personaje.js";
export class Monstruo extends Personaje {
  constructor(nombre, tipo, alias, miedo, defensa, fecha = Date.now()) {
    super(nombre, tipo);
    this.fecha = fecha;
    this.alias = alias;
    this.miedo = miedo;
    this.defensa = defensa;
  }
}
