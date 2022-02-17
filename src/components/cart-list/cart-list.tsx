import { useSelector } from 'react-redux';
import { getGuitarsInCart } from '../../store/selectors';
import CartItem from '../cart-item/cart-item';

function CartList(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);

  return (
    <>
      {guitarsInCart.map((guitar) => <CartItem key={guitar.id} guitar={guitar} />)}
    </>
  );
}

export default CartList;
