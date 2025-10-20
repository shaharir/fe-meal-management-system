export function DateFormat({ date, showTime }) {
  if (!date) return null;

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let formattedDate = `${day}-${month}-${year}`;

  if (showTime) {
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    formattedDate += ` ${hour12}:${minutes} ${ampm}`;
  }

  return formattedDate;
}
