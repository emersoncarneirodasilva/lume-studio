export const formatDuration = (min: number) => {
  const hours = Math.floor(min / 60);
  const remainingMinutes = min % 60;
  return hours > 0
    ? `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ""}`
    : `${min}min`;
};
