export const CrearTabla = (element) => {
  const $table = document.createElement("table");
  if (Array.isArray(element) && element.length > 0) {
    $table.appendChild(CrearTableHead(element[0]));
    $table.appendChild(CrearTableBody(element));
  }
  return $table;
};

function CrearTableHead(elementos) {
  if (typeof elementos === "object") {
    const $head = document.createElement("thead");
    const $tr = document.createElement("tr");
    for (const key in elementos) {
      if (key === "id") continue;
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
      if (key === "id") {
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

export const ActualizarTabla = (contenedor, data) => {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstElementChild);
  }
  contenedor.appendChild(CrearTabla(data));
};
