import React from 'react';
import axios from 'axios';

const PayNowButton = ({ amount }) => {
  const handleClick = async () => {
    const res = await axios.post('/api/payment/create-checkout-session', { amount }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    window.location.href = res.data.url;
  };

  return <button onClick={handleClick}>Pay ${amount}</button>;
};

export default PayNowButton;
