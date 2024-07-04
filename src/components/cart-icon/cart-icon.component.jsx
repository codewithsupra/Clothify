// CartIcon.component.jsx
import './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartIC, ShoppingIcon as StyledShoppingIcon, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIC onClick={toggleIsCartOpen}>
      <StyledShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIC>
  );
};

export default CartIcon;
