import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout.item.component';

const Checkout = () => {
    const { cartItems} = useContext(CartContext);

    const total = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0);

    return (
        <div className="checkout-container">
            <div className='checkout-header'>
                <div className='header-block'>
                   <span>Product</span>
                </div>
                <div className='header-block'>
                   <span>Description</span>
                </div>
                <div className='header-block'>
                  <span>Quantity</span>
                 </div>
                <div className='header-block'>
                   <span>Price</span>
                 </div>
                <div className='header-block'>
                  <span>Remove</span>
                </div>
            </div>

            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            
            <span className='total'>Total: ${total}</span>
        </div>
    );
};

export default Checkout;
