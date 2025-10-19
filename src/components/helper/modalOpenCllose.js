export const modalOpenClose = (id, state) => {
  const modal = document.getElementById(id);
  if (!modal) return;

  if (state) {
    modal.showModal(); // true → open
  } else {
    modal.close(); // false → close
  }
};
