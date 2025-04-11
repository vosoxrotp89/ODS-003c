const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-checkout-session', authMiddleware(['patient']), async (req, res) => {
  const { amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: amount * 100,
        product_data: {
          name: 'Doctor Appointment Fee',
        },
      },
      quantity: 1,
    }],
    success_url: 'http://localhost:3000/payment-success',
    cancel_url: 'http://localhost:3000/payment-cancel',
  });

  res.json({ url: session.url });
});

module.exports = router;
