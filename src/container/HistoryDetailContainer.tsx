import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseDetailData } from '../type/purchase';
import { getPurchaseStatusView, PurchaseAction, PURCHASE_STATUS } from '../constant/purchase';
import { CS_URL, getTrackingUrl } from '../constant/env';
import { purchaseApi } from '../utils/api';
import { getErrorMessage } from '../utils/format';
import { openExternalURL } from '../utils/toss';
import useToast from '../hooks/useToast';
import useAuth from '../hooks/useAuth';

import HistoryDetailComponent from '../components/History/HistoryDetailComponent';
import Dialog from '../components/Common/Dialog';
import LoginRequired from '../components/Common/LoginRequired';

type DialogType = 'CANCEL' | 'CONFIRM_SALE' | 'REQUEST_PICKUP';

const DIALOG_CONTENT: Record<
  DialogType,
  { title: string; description: string; cancelLabel: string; confirmLabel: string }
> = {
  CANCEL: {
    title: '내 폰 팔기를 취소하시겠어요?',
    description: '중고폰은 매일 매입가가 하락해요\n지금이 가장 높은 금액에 팔 수 있어요',
    cancelLabel: '계속 판매',
    confirmLabel: '판매 취소',
  },
  CONFIRM_SALE: {
    title: '판매를 확정하시겠어요?',
    description: '확정 후 계좌번호를 입력해주시면\n24시간 내로 입금이 완료돼요',
    cancelLabel: '취소',
    confirmLabel: '판매 확정',
  },
  REQUEST_PICKUP: {
    title: '상품을 수거할까요?',
    description: '상품을 준비한 뒤 문 앞에 놓아주세요',
    cancelLabel: '취소',
    confirmLabel: '수거 신청',
  },
};

const HistoryDetailContainer = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams();
  const showToast = useToast();
  const { status, userId } = useAuth();

  const [detail, setDetail] = useState<PurchaseDetailData | null>(null);
  const [message, setMessage] = useState('');
  const [dialog, setDialog] = useState<DialogType | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchDetail = useCallback(async () => {
    try {
      const res = await purchaseApi.get<PurchaseDetailData>(`/purchases/${purchaseId}`);
      if (res.data.userId !== userId) {
        setMessage('판매 내역을 찾을 수 없어요');
        return;
      }
      setDetail(res.data);
    } catch {
      setMessage('판매 내역을 불러오지 못했어요\n잠시 후 다시 시도해 주세요');
    }
  }, [purchaseId, userId]);

  useEffect(() => {
    if (status !== 'member') return;
    fetchDetail();
  }, [status, fetchDetail]);

  const handleAction = (action: PurchaseAction) => {
    switch (action) {
      case 'CANCEL_PURCHASE':
      case 'CANCEL_SALE':
        setDialog('CANCEL');
        return;
      case 'CONFIRM_SALE':
        setDialog('CONFIRM_SALE');
        return;
      case 'ACCOUNT_SAVE':
        navigate(`/history/${purchaseId}/account`);
        return;
      case 'REQUEST_PICKUP':
        setDialog('REQUEST_PICKUP');
        return;
      case 'INQUIRY':
        openExternalURL(CS_URL);
        return;
    }
  };

  const requestPickup = async () => {
    if (!detail) return;
    setSubmitting(true);
    try {
      await purchaseApi.patch(`/purchases/reapply`, {
        actorType: 'MEMBER',
        purchaseId: detail.purchaseId,
        userId,
        status: PURCHASE_STATUS.REPICKUP_REQUESTED,
      });
      showToast('수거 신청이 완료되었어요');
      setDialog(null);
      await fetchDetail();
    } catch (err) {
      showToast(getErrorMessage(err, '수거 신청에 실패했어요. 잠시 후 다시 시도해 주세요'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDialogConfirm = () => {
    if (dialog === 'CANCEL') {
      setDialog(null);
      navigate(`/history/${purchaseId}/cancel`);
      return;
    }
    if (dialog === 'CONFIRM_SALE') {
      setDialog(null);
      navigate(`/history/${purchaseId}/account`);
      return;
    }
    if (dialog === 'REQUEST_PICKUP') requestPickup();
  };

  if (status === 'guest') return <LoginRequired />;
  if (message) return <Message>{message}</Message>;
  if (!detail) return null;

  return (
    <>
      <HistoryDetailComponent
        detail={detail}
        view={getPurchaseStatusView(detail.status, detail.purchaseType)}
        onAction={handleAction}
        onTrack={(trackingNumber) => openExternalURL(getTrackingUrl(trackingNumber))}
      />
      {dialog && (
        <Dialog
          {...DIALOG_CONTENT[dialog]}
          loading={submitting}
          onCancel={() => setDialog(null)}
          onConfirm={handleDialogConfirm}
        />
      )}
    </>
  );
};

export default HistoryDetailContainer;

const Message = styled.p`
  padding: 120px 24px 0;
  font-size: 16px;
  line-height: 24px;
  color: #6b7380;
  text-align: center;
  white-space: pre-line;
`;
