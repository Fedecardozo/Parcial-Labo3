// la url tiene que ir por parametro
export const ajaxGet = (url, $img, call) => {
  $img.hidden = false;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // const data = JSON.parse(xhr.responseText);
        //Aca tengo que hacer algo
        //   call();
        call(xhr);
        // return data;
      } else {
        console.error("Errro: " + xhr.status + " " + xhr.statusText);
      }
    }
    $img.hidden = true;
  });
  xhr.open("GET", url);
  xhr.send();
};

//id por parametro
const getMonstrussos = () => {
  $img.hidden = false;

  const xhr = new XMLHttpRequest();

  //Cada vez que cambia de estado
  // xhr.onreadystatechange = ()=>{

  // };

  //Cada vez que cambia de estado

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error("Errro: " + xhr.status + " " + xhr.statusText);
      }
      $img.hidden = true;
    }
  });
  //   xhr.open("GET", URL + "/" + id);
  xhr.open("GET", URL + "/2");
  xhr.send();
};

//Create persona
const getMonstsruos = () => {
  $img.hidden = false;
  const data = {
    nombre: "Scarlata",
    tipo: "bruja",
    alias: "lata",
    miedo: "66",
    defensa: "pocion",
  };
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error("Errro: " + xhr.status + " " + xhr.statusText);
      }
      $img.hidden = true;
    }
  });
  //   xhr.open("GET", URL + "/" + id);
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};

//id por parametro
const getMonstruoss = () => {
  $img.hidden = false;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error("Errro: " + xhr.status + " " + xhr.statusText);
      }
      $img.hidden = true;
    }
  });
  //   xhr.open("GET", URL + "/" + id);
  xhr.open("DELETE", URL + "/7");
  xhr.send();
};

//id por parametro
const getMonstruos = () => {
  $img.hidden = false;

  const data = {
    id: 5,
    nombre: "Scarlata",
    tipo: "bruja",
    alias: "lata",
    miedo: "66",
    defensa: "pocion",
  };

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error("Errro: " + xhr.status + " " + xhr.statusText);
      }
      $img.hidden = true;
    }
  });
  //   xhr.open("GET", URL + "/" + id);
  xhr.open("PUT", URL + "/" + data.id);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};
