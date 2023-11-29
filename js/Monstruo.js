import { Personaje } from "./Personaje.js";
export class Monstruo extends Personaje {
  constructor(nombre, tipo, alias, miedo, defensa) {
    super(nombre, tipo);
    this.alias = alias;
    this.miedo = miedo;
    this.defensa = defensa;
  }
  // toString() {
  //   return `Nombre: ${this.nombre} <br>
  //   tipo : ${this.tipo}<br>
  //   alias : ${this.alias}<br>
  //   miedo : ${this.miedo}<br>
  //   defensa : ${this.defensa}<br>`;
  // }
}
