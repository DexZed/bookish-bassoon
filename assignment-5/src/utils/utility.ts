export function trackIdGenerator() {
  // id structure TRK-YYYYMMDD-xxxxxx
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let random = Math.floor(Math.random() * 1000000);
  let id = `TRK-${year.toString().padStart(4, "0")}${month
    .toString()
    .padStart(2, "0")}${day.toString().padStart(2, "0")}-${random
    .toString()
    .padStart(6, "0")}`;
  return id;
}
