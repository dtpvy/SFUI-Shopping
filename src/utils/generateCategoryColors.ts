export const generateCategoryColors = (categoryName: string) => {
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color1 = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
    (hash >> 16) &
    0xff
  )
    .toString(16)
    .padStart(2, "0")}${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}`;
  const color2 = `#${((hash >> 16) & 0xff).toString(16).padStart(2, "0")}${(
    (hash >> 8) &
    0xff
  )
    .toString(16)
    .padStart(2, "0")}${(hash & 0xff).toString(16).padStart(2, "0")}`;

  const r = parseInt(color1.substring(1, 3), 16);
  const g = parseInt(color1.substring(3, 5), 16);
  const b = parseInt(color1.substring(5, 7), 16);
  const contrastColor =
    r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";

  return {
    backgroundColor: `linear-gradient(135deg, ${color1}, ${color2})`,
    textColor: contrastColor,
  };
};
