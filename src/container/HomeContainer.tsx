import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PurchaseHistoryItem } from '../type/purchase';
import { isInProgress } from '../constant/purchase';
import { purchaseApi } from '../utils/api';
import useAuth from '../hooks/useAuth';

import Home from '../components/Home/Home';

const HomeContainer = () => {
  const navigate = useNavigate();
  const { status, userId, login } = useAuth();
  const [inProgressCount, setInProgressCount] = useState(0);

  useEffect(() => {
    if (status !== 'member' || !userId) return;

    const fetchHistory = async () => {
      try {
        const res = await purchaseApi.get<PurchaseHistoryItem[]>(
          `/purchases/product/user/${userId}`
        );
        const inProgressIds = new Set(
          res.data.filter((item) => isInProgress(item.status)).map((item) => item.purchaseId)
        );
        setInProgressCount(inProgressIds.size);
      } catch {
        // 홈 진입은 막지 않고 0건으로 표시
      }
    };

    fetchHistory();
  }, [status, userId]);

  // 판매 내역은 로그인이 필요해서, 카드를 눌렀을 때 토스 로그인을 시작한다
  const openHistory = async () => {
    if (!(await login())) return;
    navigate('/history');
  };

  const saleSummary =
    status === 'member'
      ? `진행 중인 판매 ${inProgressCount}건`
      : status === 'guest'
        ? '토스 로그인 후 확인할 수 있어요'
        : '';

  return <Home saleSummary={saleSummary} onOpenHistory={openHistory} />;
};

export default HomeContainer;
