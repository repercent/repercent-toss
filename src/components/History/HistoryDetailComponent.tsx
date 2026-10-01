import styled from 'styled-components';

import { PurchaseDetailData } from '../../type/purchase';
import {
  CSV_COMPANY_LABEL,
  PurchaseAction,
  PurchaseStatusView,
  PURCHASE_STATUS,
} from '../../constant/purchase';
import { IMAGE_URL } from '../../constant/env';
import { formatPhone, formatPrice, getProductName } from '../../utils/format';

import CTAButton from '../Common/Button/CTAButton';
import ProgressStepper from './ProgressStepper';

interface HistoryDetailProps {
  detail: PurchaseDetailData;
  view: PurchaseStatusView;
  onAction: (action: PurchaseAction) => void;
  onTrack: (trackingNumber: string) => void;
}

const ACTION_LABEL: Record<PurchaseAction, string> = {
  CANCEL_PURCHASE: '내 폰 팔기 취소하기',
  CANCEL_SALE: '판매 취소하기',
  CONFIRM_SALE: '판매 확정',
  ACCOUNT_SAVE: '계좌번호 입력',
  INQUIRY: '문의하기',
  REQUEST_PICKUP: '수거 재신청',
};

const SECONDARY_ACTIONS: PurchaseAction[] = ['CANCEL_PURCHASE', 'CANCEL_SALE', 'INQUIRY'];

const getTrackingNumber = (detail: PurchaseDetailData) => {
  if (detail.status === PURCHASE_STATUS.RETURNED) return detail.returnTrackingNumber;
  return detail.kitTrackingNumber ?? detail.pickupTrackingNumber;
};

const HistoryDetailComponent = ({ detail, view, onAction, onTrack }: HistoryDetailProps) => {
  const trackingNumber = getTrackingNumber(detail);
  const address = [detail.address1, detail.address2].filter(Boolean).join(' ');

  const renderActions = () => {
    if (view.actions.length === 0) return null;

    if (view.actions.length === 1 && view.actions[0] === 'CANCEL_PURCHASE') {
      return (
        <CTAButton variant="secondary" size="small" onClick={() => onAction('CANCEL_PURCHASE')}>
          {ACTION_LABEL.CANCEL_PURCHASE}
        </CTAButton>
      );
    }

    return (
      <ActionRow>
        {view.actions.map((action) => (
          <CTAButton
            key={action}
            size="large"
            variant={SECONDARY_ACTIONS.includes(action) ? 'secondary' : 'primary'}
            onClick={() => onAction(action)}
          >
            {ACTION_LABEL[action]}
          </CTAButton>
        ))}
      </ActionRow>
    );
  };

  return (
    <DetailBase>
      <Top>
        <Header>
          <Title>{view.title}</Title>
          {view.description && <Description>{view.description}</Description>}
        </Header>
        {view.step !== null && <ProgressStepper step={view.step} completed={view.completed} />}
      </Top>

      <Body>
        <Section>
          <SectionTitle>판매 상품</SectionTitle>
          <Card $compact>
            <Product>
              <ProductImage>
                {detail.image && <img src={`${IMAGE_URL}/${detail.image}`} alt="" />}
              </ProductImage>
              <div>
                <ProductName>{getProductName(detail)}</ProductName>
                {detail.price != null && <Price>{formatPrice(detail.price)}</Price>}
              </div>
            </Product>
          </Card>
        </Section>

        {detail.purchaseType === 'CSV' && (
          <Section>
            <SectionTitle>접수 방법</SectionTitle>
            <Card>
              <InfoText>{CSV_COMPANY_LABEL[detail.csvCompany ?? ''] ?? '편의점 택배'}</InfoText>
              <InfoRow>
                <InfoLabel>예약번호</InfoLabel>
                <InfoValue>{detail.csvCode ?? '발급 대기중'}</InfoValue>
              </InfoRow>
            </Card>
          </Section>
        )}

        {detail.purchaseType === 'VISIT' && (
          <Section>
            <SectionTitle>접수 방법</SectionTitle>
            <Card>
              <InfoText>리퍼센트 방문</InfoText>
              {detail.reservationDay && (
                <InfoRow>
                  <InfoLabel>방문 예약</InfoLabel>
                  <InfoValue>
                    {detail.reservationDay} {detail.reservationTime ?? ''}
                  </InfoValue>
                </InfoRow>
              )}
            </Card>
          </Section>
        )}

        <Section>
          <SectionTitle>사용자 정보</SectionTitle>
          <Card>
            <UserInfo>
              <InfoText>{detail.name}</InfoText>
              {detail.phone && <InfoLabel>{formatPhone(detail.phone)}</InfoLabel>}
              {detail.zipcode && (
                <InfoText>
                  [{detail.zipcode}] {address}
                </InfoText>
              )}
            </UserInfo>
            {trackingNumber && (
              <>
                <CardDivider />
                <InfoRow $between>
                  <InfoRow>
                    <InfoLabel>송장번호</InfoLabel>
                    <InfoValue>{trackingNumber}</InfoValue>
                  </InfoRow>
                  <TrackButton type="button" onClick={() => onTrack(trackingNumber)}>
                    배송조회
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M8 5.5L12.5 10L8 14.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </TrackButton>
                </InfoRow>
              </>
            )}
          </Card>
        </Section>

        <Section>
          <SectionTitle>신청 번호</SectionTitle>
          <Card>
            <InfoRow $between>
              <InfoValue $regular>{detail.purchaseUid}</InfoValue>
              <InfoLabel>{detail.createdAt}</InfoLabel>
            </InfoRow>
          </Card>
        </Section>

        {renderActions()}
      </Body>
    </DetailBase>
  );
};

export default HistoryDetailComponent;

const DetailBase = styled.main`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
`;

const Top = styled.div`
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: #202938;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #6b7380;
  white-space: pre-line;
  word-break: keep-all;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px 16px calc(40px + env(safe-area-inset-bottom));
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  color: #384152;
`;

const Card = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: ${({ $compact }) => ($compact ? '12px' : '16px')};
  border-radius: 16px;
  background-color: #fff;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProductImage = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 40px;
    height: 52px;
    object-fit: contain;
  }
`;

const ProductName = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #384152;
`;

const Price = styled.p`
  margin-top: 4px;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: ${({ theme }) => theme.secondary[700]};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: #111828;
  word-break: keep-all;
`;

const InfoRow = styled.div<{ $between?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $between }) => ($between ? 'space-between' : 'flex-start')};
  gap: 16px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: #6b7380;
`;

const InfoValue = styled.span<{ $regular?: boolean }>`
  font-size: 14px;
  font-weight: ${({ $regular }) => ($regular ? 400 : 700)};
  line-height: 21px;
  color: #384152;
`;

const CardDivider = styled.hr`
  height: 1px;
  margin: 8px 0;
  border: none;
  background-color: #e6e7eb;
`;

const TrackButton = styled.button`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: #2272eb;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 8px;

  & > button {
    flex: 1;
  }
`;
