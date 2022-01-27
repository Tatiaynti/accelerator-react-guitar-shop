import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { stringLabels, stringValues, FilterByType, AppRoute, StringCount, QueryParams } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import { setUserPriceMax, setUserPriceMin } from '../../store/action';
import { getGuitars } from '../../store/selectors';
import { getMaxPrice, getMinPrice, getElementIdByStrings, matchStringsWithType } from '../../utils/utils';

function CatalogFilters(): JSX.Element {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const guitars = useSelector(getGuitars);

  const [currentTypes, setCurrentTypes] = useState<string[]>([]);
  const [currentStringCount, setCurrentStringCount] = useState<string[]>([]);
  const [availableStringCount, setAvailableStringCount] = useState<number[]>(stringValues);
  const [userPriceMinValue, setUserPriceMinValue] = useState('');
  const [userPriceMaxValue, setUserPriceMaxValue] = useState('');

  const history = useHistory();

  const minPrice = getMinPrice(guitars);
  const maxPrice = getMaxPrice(guitars);

  const handlePriceMinChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserPriceMinValue(target.value);
  };
  const handlePriceMaxChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserPriceMaxValue(target.value);
  };

  const handlePriceMinBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set(QueryParams.PriceGte, target.value);
    if (+target.value < minPrice && target.value !== '') {
      setUserPriceMinValue(minPrice.toString());
      queryParams.set(QueryParams.PriceGte, minPrice.toString());
    }
    if (+target.value > maxPrice && target.value !== '') {
      setUserPriceMinValue(maxPrice.toString());
      queryParams.set(QueryParams.PriceGte, maxPrice.toString());
    }
    if (+target.value > +userPriceMaxValue && userPriceMaxValue !== '') {
      setUserPriceMinValue(userPriceMaxValue);
      queryParams.set(QueryParams.PriceGte, userPriceMaxValue);
    }
    queryParams.set(QueryParams.CurrentPageNumber, '0');
    dispatch(setUserPriceMin(target.value));
    if (target.value === '') {
      queryParams.delete(QueryParams.PriceGte);
    }
    history.push(`${AppRoute.Query}${queryParams.toString()}`);
  };

  const handlePriceMaxBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set(QueryParams.PriceLte, target.value);
    if (+target.value < minPrice && target.value !== '') {
      setUserPriceMaxValue(minPrice.toString());
      queryParams.set(QueryParams.PriceLte, minPrice.toString());

    }
    if (+target.value > maxPrice && target.value !== '') {
      setUserPriceMaxValue(maxPrice.toString());
      queryParams.set(QueryParams.PriceLte, maxPrice.toString());
    }
    if (+target.value < +userPriceMinValue && userPriceMinValue !== '') {
      setUserPriceMaxValue(userPriceMinValue);
      queryParams.set(QueryParams.PriceLte, userPriceMinValue);
    }
    queryParams.set(QueryParams.CurrentPageNumber, '0');
    dispatch(setUserPriceMax(target.value));
    if (target.value === '') {
      queryParams.delete(QueryParams.PriceLte);
    }
    history.push(`${AppRoute.Query}${queryParams.toString()}`);
  };

  const handleGuitarTypeCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set(QueryParams.CurrentPageNumber, '0');
    switch (target.name) {
      case FilterByType.Acoustic:
        queryParams.set(QueryParams.AcousticType, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case FilterByType.Electric:
        queryParams.set(QueryParams.ElectricType, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case FilterByType.Ukulele:
        queryParams.set(QueryParams.UkuleleType, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
    }
  };

  const handleGuitarStringCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set(QueryParams.CurrentPageNumber, '0');
    switch (target.name) {
      case StringCount.FourStrings:
        queryParams.set(QueryParams.FourString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case StringCount.SixStrings:
        queryParams.set(QueryParams.SixString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case StringCount.SevenStrings:
        queryParams.set(QueryParams.SevenString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
      case StringCount.TwelveStrings:
        queryParams.set(QueryParams.TwelveString, String(+target.checked));
        history.push(`${AppRoute.Query}${queryParams.toString()}`);
        break;
    }
  };

  useEffect(() => {
    stringValues.forEach((value) => {
      document.getElementById(`${getElementIdByStrings(value)}`)?.setAttribute('disabled', 'true');
    });

    availableStringCount.forEach((value) => {
      document.getElementById(`${getElementIdByStrings(value)}`)?.removeAttribute('disabled');
    });
  }, [availableStringCount, currentStringCount]);

  const handleTypeInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentTypes.push(target.id);
      setCurrentTypes(currentTypes);
    } else {
      const index = currentTypes.indexOf(target.id);
      currentTypes.splice(index, 1);
    }

    if (currentTypes.length === 0) {
      setAvailableStringCount(stringValues);
    } else {
      setAvailableStringCount(matchStringsWithType(currentTypes));
    }
  };

  const handleStringCountInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentStringCount.push(target.id);
      setCurrentStringCount(currentStringCount);
    } else {
      const index = currentStringCount.indexOf(target.id);
      currentStringCount.splice(index, 1);
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={`${minPrice}`}
              id="priceMin"
              name="от"
              value={userPriceMinValue}
              onChange={handlePriceMinChange}
              onBlur={handlePriceMinBlur}
              data-testid="minPrice"
            >
            </input>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={`${maxPrice}`}
              id="priceMax"
              name="до"
              value={userPriceMaxValue}
              onChange={handlePriceMaxChange}
              onBlur={handlePriceMaxBlur}
              data-testid="maxPrice"
            >
            </input>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onInput={(event) => {
              handleTypeInput(event);
            }}
            onChange={handleGuitarTypeCheck}
            checked={queryParams.has(QueryParams.AcousticType) ? Boolean(Number(queryParams.get(QueryParams.AcousticType))) : false}
          >
          </input>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onInput={(event) => {
              handleTypeInput(event);
            }}
            onChange={handleGuitarTypeCheck}
            checked={queryParams.has(QueryParams.ElectricType) ? Boolean(Number(queryParams.get(QueryParams.ElectricType))) : false}
          >
          </input>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onInput={(event) => {
              handleTypeInput(event);
            }}
            onChange={handleGuitarTypeCheck}
            checked={queryParams.has(QueryParams.UkuleleType) ? Boolean(Number(queryParams.get(QueryParams.UkuleleType))) : false}
          >
          </input>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParams.FourString) ? Boolean(Number(queryParams.get(QueryParams.FourString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="4-strings">{stringLabels.fourStrings}</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParams.SixString) ? Boolean(Number(queryParams.get(QueryParams.SixString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="6-strings">{stringLabels.sixStrings}</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParams.SevenString) ? Boolean(Number(queryParams.get(QueryParams.SevenString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="7-strings">{stringLabels.sevenStrings}</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
            checked={queryParams.has(QueryParams.TwelveString) ? Boolean(Number(queryParams.get(QueryParams.TwelveString))) : false}
            onChange={handleGuitarStringCheck}
          >
          </input>
          <label htmlFor="12-strings">{stringLabels.twelveStrings}</label>
        </div>
      </fieldset>

    </form>
  );
}

export default CatalogFilters;
