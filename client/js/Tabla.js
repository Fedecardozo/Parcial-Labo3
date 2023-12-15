export const CrearTabla = (element) => {
  const $table = document.createElement("table");
  if (Array.isArray(element) && element.length > 0) {
    $table.appendChild(CrearTableHead(element[0]));
    $table.appendChild(CrearTableBody(element));
  }
  $table.setAttribute("id", "tablaMonstruos");
  return $table;
};

function CrearTableHead(elementos) {
  if (typeof elementos === "object") {
    const $head = document.createElement("thead");
    const $tr = document.createElement("tr");
    for (const key in elementos) {
      if (key === "id" || key === "fecha") continue;
      const $th = document.createElement("th");
      $th.textContent = key;
      $tr.appendChild($th);
    }

    $head.appendChild($tr);
    return $head;
  }
  return null;
}

function CrearTableBody(elementos) {
  const $body = document.createElement("tbody");

  elementos.forEach((element) => {
    const $tr = document.createElement("tr");

    for (const key in element) {
      if (key === "id" || key === "fecha") {
        $tr.setAttribute("data-id", element[key]);
        continue;
      }
      const $td = document.createElement("td");
      $td.textContent = element[key];
      $tr.appendChild($td);
    }
    $body.appendChild($tr);
  });

  return $body;
}

export const ActualizarTable = (contenedor, data) => {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstElementChild);
  }
  //Loader
  if (data.length) {
    data.sort((value, value2) => value2.miedo - value.miedo);
    contenedor.appendChild(CrearTabla(data));
  }
};
