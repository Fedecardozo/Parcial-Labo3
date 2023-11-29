const personas = JSON.parse(localStorage.getItem("personas")) || [];

const $seccionTabla = document.getElementById("tabla");
const $formmulario = document.forms[0];

$formmulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const { txtId, txtEdad, txtNombre, txtEmail, rdoGenero } = $formmulario;

  if (txtId.value === "") {
    //persona nueva
    const newPersona = new Personaje(
      date.now(),
      txtNombre.value,
      parseInt(txtEdad.value),
      txtEmail.value,
      rdoGenero.value
    );

    handlerCreate(newPersona);
  } else {
    //update persona
    const newPersona = new Personaje(
      parseInt(txtId),
      txtNombre.value,
      parseInt(txtEdad.value),
      txtEmail.value,
      rdoGenero.value
    );
    handlerUpdate(newPersona);
  }

  $formmulario.reset;
});

function handlerCreate(nuevaPersona) {
  personas.push(nuevaPersona);
  actualizarTabla($seccionTabla, personas);
}

function handlerUpdate(editPersona) {}
function handlerDelete(idPersona) {}
