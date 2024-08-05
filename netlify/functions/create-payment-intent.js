require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      },
      body: JSON.stringify({ paymentIntent })
    };
  } catch (error) {
    console.error('Error creating payment intent:', error); // Log the error
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      },
      body: JSON.stringify({ error: error.message }) // Return the error message
    };
  }
};

