import { Bounce, toast } from "react-toastify";

export function numberFomatter(number: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  return formatter.format(number);
}

export function calculateAverage(ratings: { name: string; count: number }[]) {
  let totalScore = 0;
  let totalCount = 0;

  ratings.forEach((item) => {
    const ratingValue = parseInt(item.name); // "1 star" → 1
    totalScore += ratingValue * item.count;
    totalCount += item.count;
  });

  return totalCount === 0 ? 0 : totalScore / totalCount;
}

export function successToast(message: string) {
  const isDark = localStorage.getItem("theme") === "luxury";
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    rtl: false,
    progress: undefined,
    theme: isDark ? "dark" : "light",
    transition: Bounce,
  });
}
