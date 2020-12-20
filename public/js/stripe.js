/* eslint-disable */
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51I0NWAKqliu0fvwIffQlX6aZnu4xpHmBS7aHfaxFsWFYCW1cKa1hQyjdyJm6Cs1H9hB6Oz6MZ0dWQQicLys2g2eZ00dBm1teQo'
);
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
