export const roundStatNumber = (number) => {
  number = Number(number);
  if (number >= 1000) {
    number = (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return number;
};
