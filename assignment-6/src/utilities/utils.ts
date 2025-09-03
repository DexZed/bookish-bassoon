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

export function StatDate(isoString?: string, locale: string = "en-US") {
  if (!isoString) return "";
  const date = new Date(isoString);

  return date.toLocaleDateString(locale, {
    month: "short", // "August"
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
export function percentageRatio(value: number, total: number){
  const result = (value / total) * 100;
  return result.toFixed(2)+'%';
}

// utils/validateTrackingId.js
export function validateTrackingId(value:string) {
  if (!value.startsWith("TRK-")) {
    return "Must start with TRK-";
  }

  const regex = /^TRK-(\d{8})-(\d{6})$/;
  const match = value.match(regex);
  if (!match) {
    return "Format must be TRK-YYYYMMDD-xxxxxx";
  }

  const dateStr = match[1]; // YYYYMMDD
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1; // zero-based
  const day = parseInt(dateStr.substring(6, 8), 10);

  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return "Date part (YYYYMMDD) is invalid";
  }

  return true;
}
