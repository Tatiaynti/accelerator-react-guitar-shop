import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getGuitars } from '../../store/selectors';

function HeaderFormSearch(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const [isSearchResultShown, setSearchResultShown] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResultShown(true);
    setSearchValue(target.value);
    if (!target.value.length) {
      setSearchResultShown(false);
    }
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" data-testid="search" onChange={handleSearchChange}/>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {isSearchResultShown ?
        <ul className="form-search__select-list">
          {guitars
            .filter((guitar) => guitar.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((guitar) => (
              <li className="form-search__select-item" tabIndex={1} key={guitar.id}>
                <Link to={generatePath(AppRoute.Guitar, {id: guitar.id})} className="link">{guitar.name}</Link>
              </li>))}
        </ul>
        : <ul className="form-search__select-list hidden"></ul> }
    </div>
  );
}

export default HeaderFormSearch;
