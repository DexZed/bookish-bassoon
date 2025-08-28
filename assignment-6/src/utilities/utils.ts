import axios from "axios";
import Swal from "sweetalert2";
import type { User } from "../interfaces/globalInterfaces";
// Success alert
export function showSuccessAlert(title: string, text: string): void {
  Swal.fire({
    title,
    text,
    icon: "success",
  });
}

// Error alert
export function showErrorAlert(title: string, text: string): void {
  Swal.fire({
    title,
    text,
    icon: "error",
  });
}

// Confirmation alert with callback
export function showConfirmationAlert(
  title: string,
  text: string,
  confirmText: string,
  cancelText: string,
  onConfirm: () => void
): void {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
export function formatDate(isoString?: string, locale: string = "en-US") {
  if (!isoString) return "";
  const date = new Date(isoString);

  return date.toLocaleDateString(locale, {
    weekday: "short", // e.g. "Wed"
    year: "numeric", // 2026
    month: "long", // "August"
    day: "numeric", // 5
  });
}

export async function fetchUser(url: string): Promise<User | null> {
  try {
    const response = await axios.get<{ message: string; user: User }>(url);
    return response.data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
