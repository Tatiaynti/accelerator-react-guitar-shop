import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { QueryParams, AppRoute, PRODUCTS_PER_PAGE } from '../../const';
import { useQueryParams } from '../../hooks/use-query-params';
import { getGuitarsCount } from '../../store/selectors';
import CatalogPaginationItem from './catalog-pagination-item';

function CatalogPagination(): JSX.Element {
  const history = useHistory();
  const queryParams = useQueryParams();
  const guitarsCount = useSelector(getGuitarsCount);
  const paginationPageLinkCount = Math.ceil(guitarsCount / PRODUCTS_PER_PAGE);

  useEffect(()=>{
    if (!queryParams.has(QueryParams.CurrentPageNumber)) {
      queryParams.set(QueryParams.CurrentPageNumber, '0');
      history.push(`${AppRoute.Query}${queryParams.toString()}`);
    }
  }, [history, queryParams]);

  const handlePrevLinkClick = () => {
    if (Number(queryParams.get(QueryParams.CurrentPageNumber)) > 0) {
      queryParams.set(QueryParams.CurrentPageNumber, String(Number(queryParams.get(QueryParams.CurrentPageNumber)) - 1));
      history.push(`${AppRoute.Query}${queryParams.toString()}`);
    }
  };

  const handleNextLinkClick = () => {
    queryParams.set(QueryParams.CurrentPageNumber, String(Number(queryParams.get(QueryParams.CurrentPageNumber)) + 1));
    history.push(`${AppRoute.Query}${queryParams.toString()}`);
  };

  if (guitarsCount <= PRODUCTS_PER_PAGE) {
    return (<div className="pagination page-content__pagination" data-testid="pagination"></div>);
  }

  return (
    <div className="pagination page-content__pagination" data-testid="pagination">
      <ul className="pagination__list">
        {Number(queryParams.get(QueryParams.CurrentPageNumber)) !== 0 &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a className="link pagination__page-link" href="#top" onClick={handlePrevLinkClick}>Назад</a>
          </li>}
        {new Array(paginationPageLinkCount)
          .fill('')
          .map((item, i) => <CatalogPaginationItem pageCount={i + 1} key={i++} activePage={Number(queryParams.get(QueryParams.CurrentPageNumber)) + 1} />)}
        {Number(queryParams.get(QueryParams.CurrentPageNumber)) !== paginationPageLinkCount - 1 &&
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link" href="#top" onClick={handleNextLinkClick}>Далее</a>
          </li>}
      </ul>
    </div>
  );
}

export default CatalogPagination;
