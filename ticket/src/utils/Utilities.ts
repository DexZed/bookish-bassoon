import Swal from "sweetalert2";

// Success alert
export function showSuccessAlert(title: string, text: string): void {
  Swal.fire({
    theme:"bootstrap-5-dark",
    title,
    text,
    icon: "success",
  });
}
