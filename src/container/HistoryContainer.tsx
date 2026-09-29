import { useEffect, useState } from 'react';

import { PurchaseHistoryItem } from '../type/purchase';
import { purchaseApi } from '../utils/api';
import { getUserId } from '../utils/user';

import HistoryComponent from '../components/History/HistoryComponent';

const HistoryContainer = () => {
  const userId = getUserId();

  const [items, setItems] = useState<PurchaseHistoryItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      try {
        const res = await purchaseApi.get<PurchaseHistoryItem[]>(
          `/purchases/product/user/${userId}`
        );
        setItems(res.data ?? []);
      } catch {
        setError(true);
      }
    };

    fetchHistory();
  }, [userId]);

  const message = !userId
    ? '로그인 후 판매 내역을 확인할 수 있어요'
    : error
      ? '판매 내역을 불러오지 못했어요\n잠시 후 다시 시도해 주세요'
      : undefined;

  return <HistoryComponent items={items} message={message} />;
};

export default HistoryContainer;
