import Swal from "sweetalert2";

export const toast = (position, title, icon = "info", timer = 3000) => {
  Swal.fire({
    position,
    icon,
    title,
    toast: true,
    showConfirmButton: false,
    timer,
  });
};
