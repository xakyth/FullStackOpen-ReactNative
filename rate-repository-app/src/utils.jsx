import { format } from 'date-fns';

export const roundStatNumber = (number) => {
  number = Number(number);
  if (number >= 1000) {
    number = (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return number;
};

export const convertDate = (date) => {
  return format(new Date(date), 'dd.MM.yyyy');
};
