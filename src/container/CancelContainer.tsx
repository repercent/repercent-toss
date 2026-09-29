import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { PurchaseDetailData } from '../type/purchase';
import {
  CANCEL_REASONS_AFTER,
  CANCEL_REASONS_BEFORE,
  getPurchaseStatusView,
  PURCHASE_STATUS,
} from '../constant/purchase';
import { getUserId } from '../utils/user';
import { getErrorMessage } from '../utils/format';
import useToast from '../hooks/useToast';

import CancelComponent from '../components/History/CancelComponent';

const CancelContainer = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  const showToast = useToast();
  const userId = getUserId();

  const [detail, setDetail] = useState<PurchaseDetailData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get<PurchaseDetailData>(`/api/purchases/${purchaseId}`);
        if (!userId || res.data.userId !== userId) throw new Error('not owner');
        const { actions } = getPurchaseStatusView(res.data.status, res.data.purchaseType);
        if (!actions.includes('CANCEL_PURCHASE') && !actions.includes('CANCEL_SALE')) {
          showToast('취소할 수 없는 상태예요');
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
  }, [purchaseId, userId, navigate, showToast]);

  // 상세에서 진입했다면 기존 상세 화면으로 돌아가고, 직접 진입이면 상세로 교체
  const backToDetail = (id: number) => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate(`/history/${id}`, { replace: true });
  };

  const handleSubmit = async (cancelReason: string) => {
    if (!detail || submitting) return;
    setSubmitting(true);
    try {
      await axios.patch(`/api/purchases/cancel/${detail.purchaseId}`, {
        actorType: 'MEMBER',
        purchaseId: detail.purchaseId,
        userId,
        cancelReason,
      });
      showToast('판매가 취소되었어요');
      backToDetail(detail.purchaseId);
    } catch (err) {
      showToast(getErrorMessage(err, '취소에 실패했어요. 잠시 후 다시 시도해 주세요'));
      setSubmitting(false);
    }
  };

  if (!detail) return null;

  const reasonGroups =
    detail.status < PURCHASE_STATUS.ARRIVED ? CANCEL_REASONS_BEFORE : CANCEL_REASONS_AFTER;

  return (
    <CancelComponent reasonGroups={reasonGroups} submitting={submitting} onSubmit={handleSubmit} />
  );
};

export default CancelContainer;
