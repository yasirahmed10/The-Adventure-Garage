import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to bookings since garage deals with appointments rather than food orders
    navigate('/admin/bookings');
  }, [navigate]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-gray-400">
      Redirecting to bookings management...
    </div>
  );
};

export default Orders;
