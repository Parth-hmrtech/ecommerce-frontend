import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '@/store/actions/payment.action';

const useSellerPayment = () => {
  const dispatch = useDispatch();

  const fetchSellerPayments = () => {
    return dispatch(fetchSellerPaymentsAction());
  };

  const fetchSellerEarnings = () => {
    return dispatch(fetchSellerEarningsAction());
  };

  const sellerPayments = useSelector((state) => state.payment || {});
  console.log(sellerPayments);
  
  return {
    fetchSellerPayments,
    fetchSellerEarnings,
    sellerPayments,
  };
};

export default useSellerPayment;
