// CartIcon.component.jsx
import './cart-icon.styles.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartIC, ShoppingIcon as StyledShoppingIcon, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const cartCount=useSelector(selectCartCount);
  const dispatch=useDispatch();
  const isCartOpen=useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => 
    dispatch(setIsCartOpen(!isCartOpen));
  

  return (
    <CartIC onClick={toggleIsCartOpen}>
      <StyledShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIC>
  );
};

export default CartIcon;
