import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { notifyError, notifySuccess } from '@/utils/toast';

const useKorapayCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const initializePayment = async (orderData) => {
    try {
      setIsProcessing(true);
      
      const { totalAmount } = orderData;
      let paymentAmount = totalAmount;
      let isPartialPayment = false;

      // Payment rules
      if (totalAmount >= 250000) {
        paymentAmount = totalAmount * 0.5; // 50% payment
        isPartialPayment = true;
      }

      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentAmount,
          orderId: orderData._id,
          name: user.name,
          email: user.email,
          isPartialPayment,
          totalAmount
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Korapay checkout page
        window.location.href = data.data.paymentUrl;
      } else {
        notifyError('Payment initialization failed');
      }
    } catch (error) {
      notifyError(error.message || 'Payment initialization failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(`/api/payment/verify?reference=${reference}`);
      const data = await response.json();

      if (data.success) {
        notifySuccess('Payment verified successfully');
        // Redirect to order confirmation page
        router.push(`/order/${data.data.metadata.orderId}`);
      } else {
        notifyError('Payment verification failed');
        router.push('/checkout');
      }
    } catch (error) {
      notifyError(error.message || 'Payment verification failed');
      router.push('/checkout');
    }
  };

  return {
    initializePayment,
    verifyPayment,
    isProcessing,
  };
};

export default useKorapayCheckout;