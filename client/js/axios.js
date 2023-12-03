//Delete monstruo
export const axiosDelete = async (url, id) => {
  try {
    await axios.delete(url + "/" + id);
  } catch (err) {
    alert(err.message);
  }
};
