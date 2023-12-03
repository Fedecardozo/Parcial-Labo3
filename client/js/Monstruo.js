import { Personaje } from "./Personaje.js";
export class Monstruo extends Personaje {
  constructor(nombre, tipo, alias, miedo, defensa) {
    super(nombre, tipo);
    this.alias = alias;
    this.miedo = miedo;
    this.defensa = defensa;
  }
}
