import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import Cart from '../cart/cart';
import CatalogWrapper from '../catalog-wrapper/catalog-wrapper';
import PageNotFound from '../page-not-found/page-not-found';
import ProductDetailedCard from '../product-detailed-card/product-detailed-card';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Catalog}>
        <CatalogWrapper />
      </Route>
      <Route path={AppRoute.Pagination}>
        <CatalogWrapper />
      </Route>
      <Route exact path={AppRoute.Guitar}>
        <ProductDetailedCard/>
      </Route>
      <Route path={AppRoute.Cart} exact>
        <Cart />
      </Route>
      <Route path={AppRoute.PageNotFound}>
        <PageNotFound/>
      </Route>
    </Switch>
  );
}

export default App;
