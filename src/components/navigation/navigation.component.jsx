// src/routes/navigation/navigation.component.jsx

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { Fragment } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
  NavLinkSpan
} from './navigation.styles.jsx';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';


const Navigation = () => {
//   const { currentUser } = useContext(UserContext);
const currentUser=useSelector(selectCurrentUser);
 const isCartOpen=useSelector(selectIsCartOpen);
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
