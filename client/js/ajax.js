//Traer todos
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

//Create post
export const ajaxPostCreate = (url, data) => {
  // $img.hidden = false;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        //nada
      } else {
        console.error("Error: " + xhr.status + " " + xhr.statusText);
      }
      // $img.hidden = true;
    }
  });
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};

//Modificar put obtiene el id de la data
export const ajaxPut = (url, data) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error("Errro: " + xhr.status + " " + xhr.statusText);
      }
    }
  });
  xhr.open("PUT", url + "/" + data.id);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};
