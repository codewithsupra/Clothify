// src/routes/navigation/navigation.component.jsx

import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
  NavLinkSpan
} from './navigation.styles.jsx';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const navigate=useNavigate();
  const handleSignOut = async () => {
    await signOutUser();
    navigate('/'); // Navigate to home after sign out
  };
  

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLinkSpan  onClick={handleSignOut}>SIGN OUT</NavLinkSpan>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
