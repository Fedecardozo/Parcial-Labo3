const URL = "http://localhost:3000/monstruos";

const $img = document.getElementById("spinner");

// la url tiene que ir por parametro
export const getMonstruos = (url) => {
  $img.hidden = false;

  fetch(url)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Errro: " + err.status + " " + err.statusText);
    })
    .finally(() => {
      $img.hidden = true;
    });
};

//Create persona
const getMonstrssuos = () => {
  $img.hidden = false;
  const data = {
    nombre: "Juana",
    tipo: "bruja",
    alias: "juani",
    miedo: "66",
    defensa: "pocion",
  };

  fetch(URL, {
    method: "Post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Errro: " + err.status + " " + err.statusText);
    })
    .finally(() => {
      $img.hidden = true;
    });
};

//Delete persona
const getMonstrudos = () => {
  $img.hidden = false;
  const data = {
    nombre: "Juana",
    tipo: "bruja",
    alias: "juani",
    miedo: "66",
    defensa: "pocion",
  };

  fetch(URL + "/6", {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) return Promise.reject(res);
      console.log("Eliminacion exitosa");
    })
    .catch((err) => {
      console.log("Errro: " + err.status + " " + err.statusText);
    })
    .finally(() => {
      $img.hidden = true;
    });
};
