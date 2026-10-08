import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseHistoryItem } from '../../type/purchase';
import { PURCHASE_STATUS_LABEL } from '../../constant/purchase';
import { IMAGE_URL } from '../../constant/env';
import { formatPrice, getProductName } from '../../utils/format';

import LoginRequired from '../Common/LoginRequired';

interface HistoryProps {
  items: PurchaseHistoryItem[] | null;
  /** 로그인 전이면 로그인 안내를 노출 */
  loginRequired?: boolean;
  /** 조회 실패 등 안내 문구. 있으면 목록 대신 노출 */
  message?: string;
}

const HistoryComponent = ({ items, loginRequired, message }: HistoryProps) => {
  const navigate = useNavigate();

  const renderBody = () => {
    if (loginRequired) return <LoginRequired />;
    if (message) return <Empty>{message}</Empty>;
    if (!items) return null;
    if (items.length === 0) {
      return (
        <Empty>
          판매 내역이 없어요
          <EmptyButton type="button" onClick={() => navigate('/step')}>
            내 폰 팔기 신청하기
          </EmptyButton>
        </Empty>
      );
    }

    return (
      <HistoryList>
        {items.map((item) => (
          <li key={item.purchaseProductId ?? item.purchaseId}>
            <HistoryCard type="button" onClick={() => navigate(`/history/${item.purchaseId}`)}>
              <CardHeader>
                <Status>{PURCHASE_STATUS_LABEL[item.status] ?? ''}</Status>
                <DetailLink>자세히 보기</DetailLink>
              </CardHeader>
              <Divider />
              <Product>
                <ProductImage>
                  {item.image && <img src={`${IMAGE_URL}/${item.image}`} alt="" />}
                </ProductImage>
                <ProductInfo>
                  <ProductName>{getProductName(item)}</ProductName>
                  {item.price != null ? (
                    <Price>{formatPrice(item.price)}</Price>
                  ) : (
                    <PendingPrice>검수 후 최종 견적 확정</PendingPrice>
                  )}
                </ProductInfo>
              </Product>
            </HistoryCard>
          </li>
        ))}
      </HistoryList>
    );
  };

  return (
    <HistoryBase>
      <Title>판매 내역</Title>
      {renderBody()}
    </HistoryBase>
  );
};

export default HistoryComponent;

const HistoryBase = styled.main`
  min-height: calc(var(--vh, 1vh) * 100);
  padding-bottom: 40px;
  background-color: #f9fafc;
`;

const Title = styled.h2`
  padding: 24px;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: #202938;
`;

const HistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
`;

const HistoryCard = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
  text-align: left;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Status = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  color: #384152;
`;

const DetailLink = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: rgba(0, 19, 43, 0.58);
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 0 0 4px;
  border: none;
  background-color: #f3f4f6;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProductImage = styled.div`
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #f3f4f6;

  & img {
    width: 32px;
    height: 41px;
    object-fit: contain;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProductName = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: #6b7380;
`;

const PendingPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: #384152;
`;

const Price = styled(PendingPrice)`
  color: ${({ theme }) => theme.secondary[700]};
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 120px 24px 0;
  font-size: 16px;
  line-height: 24px;
  color: #6b7380;
  text-align: center;
  white-space: pre-line;
`;

const EmptyButton = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  background-color: #e8f3ff;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.toss.blue};
`;
