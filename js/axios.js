const URL = "http://localhost:3000/monstruos";

const $img = document.getElementById("spinner");

// la url tiene que ir por parametro
const getMonstrsuos = () => {
  $img.hidden = false;

  axios
    .get(URL)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      $img.hidden = false;
    });
};

//Create persona
const getMosnstruos = () => {
  $img.hidden = false;
  const data = {
    nombre: "Samuel",
    tipo: "bruja",
    alias: "samu",
    miedo: "66",
    defensa: "pocion",
  };
  axios
    .post(URL, data, {
      "Content-Type": "application/json;charset=utf-8",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      $img.hidden = false;
    });
};

//Delete persona
const getMonstruos = () => {
  $img.hidden = false;
  axios
    .post(URL, data, {
      "Content-Type": "application/json;charset=utf-8",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      $img.hidden = false;
    });
};
