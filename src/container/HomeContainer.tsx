import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PurchaseHistoryItem } from '../type/purchase';
import { isInProgress } from '../constant/purchase';
import { purchaseApi } from '../utils/api';
import useAuth from '../hooks/useAuth';

import Home from '../components/Home/Home';

const HomeContainer = () => {
  const navigate = useNavigate();
  const { userId, login } = useAuth();
  const [inProgressCount, setInProgressCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

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
  }, [userId]);

  // 앱을 켜 둔 채 토큰이 만료됐으면 다시 로그인한 뒤 이동한다
  const openHistory = async () => {
    if (!(await login())) return;
    navigate('/history');
  };

  return <Home saleSummary={`진행 중인 판매 ${inProgressCount}건`} onOpenHistory={openHistory} />;
};

export default HomeContainer;
