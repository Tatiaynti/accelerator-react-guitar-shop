import { FilterByType, filtersByStringAndType, GuitarTypeToReadable} from '../const';
import { GuitarType } from '../types/guitar';

const ICON_FULL_STAR = '#icon-full-star';
const ICON_STAR = '#icon-star';

const setRatingStars = (rating: number, rateCount: number): string =>
  rating >= rateCount ? ICON_FULL_STAR : ICON_STAR;

const getGuitarPrices = (guitars: GuitarType[]) => [...new Set(guitars.map((guitar) => guitar.price))];

const getMinPrice = (guitars: GuitarType[]) => Math.min(...getGuitarPrices(guitars));

const getMaxPrice = (guitars: GuitarType[]) => Math.max(...getGuitarPrices(guitars));

const getElementIdByStrings = (stringsCount: number) => (filtersByStringAndType.find((element) => element.value === stringsCount))?.elementId;

const matchStringsWithType = (guitarTypes: string[]) => {
  const stringsValues: number[] = [];

  guitarTypes.forEach((type) => {
    filtersByStringAndType.forEach((element) => {

      if (element.guitarTypes.includes(type)){
        stringsValues.push(element.value);
      }
    });
  });

  return [...new Set(stringsValues)];
};

const changeGuitarTypeToReadable = (type: string) => {
  switch (type) {
    case FilterByType.Acoustic:
      return GuitarTypeToReadable.Acoustic;
    case FilterByType.Electric:
      return GuitarTypeToReadable.Electric;
    case FilterByType.Ukulele:
      return GuitarTypeToReadable.Ukulele;
  }
};

export {changeGuitarTypeToReadable, setRatingStars, getMinPrice, getMaxPrice, getElementIdByStrings, matchStringsWithType};
