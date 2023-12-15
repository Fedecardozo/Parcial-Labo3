//Delete monstruo
export const axiosDelete = async (url, $spinner, id, $table) => {
  try {
    $spinner.hidden = false;
    $table.hidden = true;
    await axios.delete(url + "/" + id);
  } catch (err) {
    alert(err.message);
  }
  $spinner.hidden = true;
  $table.hidden = false;
};
