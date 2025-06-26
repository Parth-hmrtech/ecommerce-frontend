import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellerPaymentsAction,
  fetchSellerEarningsAction,
} from '@/store/actions/seller/seller-payment.action';

const useSellerPayment = () => {
  const dispatch = useDispatch();

  const fetchSellerPayments = () => {
    return dispatch(fetchSellerPaymentsAction());
  };

  const fetchSellerEarnings = () => {
    return dispatch(fetchSellerEarningsAction());
  };

  const sellerPayments = useSelector((state) => state.sellerPayments || {});

  return {
    fetchSellerPayments,
    fetchSellerEarnings,
    sellerPayments,
  };
};

export default useSellerPayment;
