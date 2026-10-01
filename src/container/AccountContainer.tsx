import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PurchaseDetailData } from '../type/purchase';
import { getPurchaseStatusView } from '../constant/purchase';
import { purchaseApi } from '../utils/api';
import { getErrorMessage } from '../utils/format';
import useToast from '../hooks/useToast';
import useAuth from '../hooks/useAuth';

import AccountComponent, { AccountForm } from '../components/History/AccountComponent';
import LoginRequired from '../components/Common/LoginRequired';

const AccountContainer = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  const showToast = useToast();
  const { status, userId } = useAuth();

  const [detail, setDetail] = useState<PurchaseDetailData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status !== 'member') return;
    const fetchDetail = async () => {
      try {
        const res = await purchaseApi.get<PurchaseDetailData>(`/purchases/${purchaseId}`);
        if (!userId || res.data.userId !== userId) throw new Error('not owner');
        // 계좌 입력(= 판매 확정)이 가능한 상태인지 확인
        const { actions } = getPurchaseStatusView(res.data.status, res.data.purchaseType);
        if (!actions.includes('CONFIRM_SALE') && !actions.includes('ACCOUNT_SAVE')) {
          showToast('계좌번호를 입력할 수 없는 상태예요');
          navigate(`/history/${purchaseId}`, { replace: true });
          return;
        }
        setDetail(res.data);
      } catch {
        showToast('판매 내역을 불러오지 못했어요');
        navigate(-1);
      }
    };
    fetchDetail();
  }, [status, purchaseId, userId, navigate, showToast]);

  // 상세에서 진입했다면 기존 상세 화면으로 돌아가고, 직접 진입이면 상세로 교체
  const backToDetail = (id: number) => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate(`/history/${id}`, { replace: true });
  };

  const handleSubmit = async (form: AccountForm) => {
    if (!detail || submitting) return;
    setSubmitting(true);
    try {
      await purchaseApi.post(`/purchases/account`, {
        purchaseId: detail.purchaseId,
        bankCode: form.bankCode,
        holder: form.holder.trim(),
        accountNumber: form.accountNumber.trim(),
      });
      showToast('판매가 확정되었어요');
      backToDetail(detail.purchaseId);
    } catch (err) {
      showToast(getErrorMessage(err, '계좌 등록에 실패했어요. 잠시 후 다시 시도해 주세요'));
      setSubmitting(false);
    }
  };

  if (status === 'guest')
    return <LoginRequired message={'토스로 로그인한 뒤\n다시 시도해 주세요'} />;
  if (!detail) return null;

  return <AccountComponent price={detail.price} submitting={submitting} onSubmit={handleSubmit} />;
};

export default AccountContainer;
