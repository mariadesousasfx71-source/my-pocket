// "2026-10-28" → "28-10-2026"  (for showing)
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
}

// "28-10-2026" → "2026-10-28"  (for saving)
// Returns null if the text isn't a real date
export function toIsoDate(text) {
  if (!/^\d{2}-\d{2}-\d{4}$/.test(text)) return null; // wrong shape

  const [day, month, year] = text.split("-");
  const iso = `${year}-${month}-${day}`;

  // Reject impossible dates like 31-02-2026
  const d = new Date(iso);
  if (isNaN(d) || d.getDate() !== Number(day)) return null;

  return iso;
}