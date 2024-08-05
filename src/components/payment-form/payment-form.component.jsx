import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import './payment-form.styles';
import SpinnerV2 from '../spinner_v2/spinner_v2.component';


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalAmount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Stripe amount is in cents
      }).then((res) => res.json());

      console.log('Fetch response:', response); // Debugging log

      if (response.error) {
        alert(response.error);
        setIsProcessingPayment(false);
        return;
      }

      const { paymentIntent } = response;
      if (!paymentIntent) {
        alert('Payment intent creation failed.');
        setIsProcessingPayment(false);
        return;
      }

      const { client_secret } = paymentIntent;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      });

      setIsProcessingPayment(false);

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment has gone through!!');
      }
    } catch (error) {
      console.error('Error in paymentHandler:', error); // Error handling
      alert('An error occurred while processing the payment.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Card Payment:</h2>
        <CardElement />
        <br /><br />
        <Button disabled={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
          {isProcessingPayment ? <SpinnerV2/> : 'Proceed to Payment'}
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
