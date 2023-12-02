export const fetchGet = (url, $img, call) => {
  $img.hidden = false;

  fetch(url)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data) => {
      call(data);
    })
    .catch((err) => {
      console.error("Error: " + err.status + " " + err.statusText);
      call([]);
    })
    .finally(() => {
      $img.hidden = true;
    });
};

// export const fetchGet = async (url, $spinner, call) => {
//   $spinner.hidden = false;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     call(response);
//   } catch (err) {
//     console.error("Error:", err);
//     // throw err;
//   } finally {
//     $spinner.hidden = true;
//   }
// };

// export const cargarDatos = async (url, $spinner, call) => {
//   try {
//     const monstruosData = await getMonstruos(url, $spinner);
//     call(monstruosData);
//     // console.log(monstruosData);
//   } catch (error) {
//     console.error("Error al cargar datos:", error);
//   }
// };

// export const get = async (url) => {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error("Error:", err);
//     throw err;
//   } finally {
//   }
// };

// export const obtenerDatos = async (url) => {
//   try {
//     const monstruosData = await get(url);
//     return monstruosData;
//     // console.log(monstruosData);
//   } catch (error) {
//     console.error("Error al cargar datos:", error);
//   }
// };
