export const price = (price) => {
  if (!price) return "0.00";
  const str = String(price);
  return str.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
};
