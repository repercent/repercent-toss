import { useEffect, useState } from 'react';

import { PurchaseHistoryItem } from '../type/purchase';
import { purchaseApi } from '../utils/api';
import useAuth from '../hooks/useAuth';

import HistoryComponent from '../components/History/HistoryComponent';

const HistoryContainer = () => {
  const { status, userId } = useAuth();

  const [items, setItems] = useState<PurchaseHistoryItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status !== 'member' || !userId) return;

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
  }, [status, userId]);

  return (
    <HistoryComponent
      items={status === 'member' ? items : null}
      loginRequired={status === 'guest'}
      message={error ? '판매 내역을 불러오지 못했어요\n잠시 후 다시 시도해 주세요' : undefined}
    />
  );
};

export default HistoryContainer;
