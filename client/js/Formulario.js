export const cargarSelect = (select) => {
  // const selectTipo = document.getElementById("selectTipo");

  const tipos = JSON.parse(localStorage.getItem("tipos"));
  const fragment = document.createDocumentFragment();
  tipos.forEach((tipo) => {
    const option = document.createElement("OPTION");
    option.text = tipo;
    option.value = tipo;
    fragment.appendChild(option);
  });
  select.appendChild(fragment);
};

export const ManejoBtns = ($btnGuardar, $btnEliminar, $btnCancelar, guardar) => {
  if (guardar) {
    $btnGuardar.value = "Guardar";
    $btnGuardar.style.backgroundImage = 'url("../icon/disquete.png")';
    $btnEliminar.hidden = true;
    $btnCancelar.hidden = true;
  } else {
    $btnGuardar.value = "Modificar";
    $btnGuardar.style.backgroundImage = 'url("../icon/update.png")';
    $btnEliminar.hidden = false;
    $btnCancelar.hidden = false;
  }
};

export const CargarFormulario = ($formulario, monstruo) => {
  //   const { nombre, alias, defensa, miedo, selectTipo } = $formulario;

  $formulario.nombre.value = monstruo.nombre;
  $formulario.alias.value = monstruo.alias;
  $formulario.defensa.value = monstruo.defensa;
  $formulario.miedo.value = monstruo.miedo;
  $formulario.selectTipo.value = monstruo.tipo;
};

export const cargarDrop = (drop) => {
  // const selectTipo = document.getElementById("selectTipo");

  const tipos = JSON.parse(localStorage.getItem("tipos"));
  const fragment = document.createDocumentFragment();
  tipos.forEach((tipo) => {
    const option = document.createElement("li");
    option.textContent = tipo;
    option.classList = "dropdown-item pointer";
    // console.log(option.textContent);
    fragment.appendChild(option);
  });
  drop.appendChild(fragment);
};
