import { useSelector } from 'react-redux';
import { getGuitarsInCart, getGuitarsInCartCount } from '../../store/selectors';
import CartItem from '../cart-item/cart-item';

function CartList(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);
  const guitarsInCartCount = useSelector(getGuitarsInCartCount);

  return (
    <>
      {guitarsInCart.map((guitar) => {
        let guitarInCartCount = 1;
        guitarsInCartCount.forEach((count) => {
          if (count.id === guitar.id && count.count !== 0) {
            guitarInCartCount = count.count;
          }
        });

        return <CartItem key={guitar.id} guitar={guitar} guitarInCartCount={guitarInCartCount} />;
      })}
    </>
  );
}

export default CartList;
