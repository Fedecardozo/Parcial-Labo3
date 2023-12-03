import { Monstruo, CargarAtributos } from "./Monstruo.js";
import { ActualizarTable } from "./Tabla.js";
import { cargarSelect, ManejoBtns, CargarFormulario } from "./Formulario.js";
import { cargarDatos } from "./fetch.js";

//Formulario
const selectTipo = document.querySelectorAll("select");
const filterTipo = selectTipo[1];
cargarSelect(selectTipo[0]);
cargarSelect(selectTipo[1]);
const $form = document.forms[0];
const $btnSubmit = document.querySelector("input[type = 'submit']");
const $btnEliminar = document.getElementById("btnEliminar");
$btnEliminar.style.backgroundImage = 'url("../icon/borrar.png")';
$btnEliminar.style.backgroundColor = "#d7273e";
const $btnCancelar = document.getElementById("btnCancelar");
$btnCancelar.style.backgroundImage = 'url("../icon/cancelar.png")';
$btnCancelar.style.backgroundColor = "#f4787e";
//Cargar tabla
// const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
const $seccionTala = document.getElementById("tabla");
const $spinner = document.getElementById("spinner");

function ActualizarTabla($seccionTala) {
  cargarDatos(URL, $spinner, (monstruos) => {
    ActualizarTable($seccionTala, monstruos);
    PromedioMiedo(monstruos);
  });
}
//ID
let id;
let selecSelccionado = "todos";

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { nombre, alias, defensa, miedo, selectTipo } = $form;
  if ($btnSubmit.value === "Guardar") {
    const monstruoAlta = new Monstruo(
      Date.now(),
      nombre.value,
      selectTipo.value,
      alias.value,
      miedo.value,
      defensa.value
    );
    monstruoCreate(monstruoAlta);
  } else if ($btnSubmit.value === "Modificar") {
    const monstruoUpdate = new Monstruo(id, nombre.value, selectTipo.value, alias.value, miedo.value, defensa.value);
    updateMonstruo(monstruoUpdate);
  }

  $form.reset();
});

//Boton eliminar
$btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  monstruoDelete(id);
  $form.reset();
});

//Boton cancelar
$btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();

  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  $form.reset();
});

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    id = e.target.parentElement.dataset.id;
    const selectedMonstruo = monstruos.find((value) => value.id == id);
    CargarFormulario($form, selectedMonstruo);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, false);
  } else if (e.target.matches("input[type = 'checkbox']")) {
    const tablaFiltrada = filtros();

    ActualizarTabla($seccionTala);
  }
});

function ObtenerChecksSeleccionados() {
  const cheksBox = Array.from(document.querySelectorAll("input[type = 'checkbox']"));

  return cheksBox.filter((chek) => chek.checked).map((el) => el.value);
}

function ObtenerArraySelec() {
  if (selecSelccionado === "todos") {
    PromedioMiedo(monstruos);

    return monstruos;
  }
  const filtroTipo = monstruos.filter((obj) => {
    return obj.tipo === selecSelccionado;
  });
  PromedioMiedo(filtroTipo);

  return filtroTipo;
}

function filtros() {
  const monstruos = ObtenerArraySelec();
  const seleccionados = ObtenerChecksSeleccionados();

  const tablaFiltrada = monstruos.map((monster) => {
    const newMonster = {};
    for (const key in monster) {
      CargarAtributos(newMonster, "id", monster.id);
      seleccionados.forEach((value) => {
        if (key === value) {
          CargarAtributos(newMonster, key, monster[key]);
        }
      });
    }
    return newMonster;
  });
  return tablaFiltrada;
}

//Seleecion tipo de filtro
filterTipo.addEventListener("change", (e) => {
  const seleccion = e.target.value;

  selecSelccionado = seleccion;

  const arrayFiltros = filtros();
  ActualizarTabla($seccionTala, arrayFiltros);
});

//CRUD MONSTRUOS
function monstruoCreate(newMonstruo) {
  monstruos.push(newMonstruo);
  actualizarStorage();
  ActualizarTabla($seccionTala, monstruos);
}

function updateMonstruo(monstruo) {
  let index = monstruos.findIndex((value) => value.id == monstruo.id);
  monstruos.splice(index, 1, monstruo);
  actualizarStorage();
  ActualizarTabla($seccionTala, monstruos);
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
}

function monstruoDelete(idMonstruo) {
  let index = monstruos.findIndex((value) => value.id == idMonstruo);
  monstruos.splice(index, 1);
  console.log(monstruos);
  ActualizarTabla($seccionTala, monstruos);
  actualizarStorage();
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
}

function actualizarStorage() {
  localStorage.setItem("monstruos", JSON.stringify(monstruos));
}

function PromedioMiedo(arrayMonstruos) {
  let promedio = 0;
  if (Array.isArray(arrayMonstruos) && arrayMonstruos.length) {
    let suma = arrayMonstruos.map((monster) => parseInt(monster.miedo)).reduce((acu, el) => (acu += el));
    promedio = suma / arrayMonstruos.length;
  }
  // console.log(suma / arrayMonstruos.length);
  document.getElementById("txtPromedio").value = promedio;
}

/*//SELECT TIPO
document.getElementById("selectFilterTipo").addEventListener("change", (e) => {
  const seleccion = e.target.value;
  const tr = document.querySelectorAll("tr");

  //Arranco en el indice uno, asi no empiezo por la <th>
  for (let index = 1; index < tr.length; index++) {
    //Fila completa
    const fila = tr[index];

    //Muestro todos
    if (seleccion === "todos") {
      fila.style.display = "table-row";
    } else {
      //Indice de donde coincide la seleccion
      const indice = fila.innerHTML.indexOf(`<td>${seleccion}</td>`);

      //Si el indice es menor a 0, oculto lo que no fue seleccionado
      if (indice < 0) {
        fila.style.display = "none";
      }
      //Si es mayor a 0 muestro la fila que fue seleccionado
      else {
        fila.style.display = "table-row";
      }
    }
  }
});
*/
