import { useEffect, useState } from 'react';

import { PurchaseHistoryItem } from '../type/purchase';
import { isInProgress } from '../constant/purchase';
import { purchaseApi } from '../utils/api';
import { getUserId } from '../utils/user';

import Home from '../components/Home/Home';

const HomeContainer = () => {
  const [inProgressCount, setInProgressCount] = useState(0);

  useEffect(() => {
    const userId = getUserId();
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
  }, []);

  return <Home inProgressCount={inProgressCount} />;
};

export default HomeContainer;
