import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState, PurchaseType } from '../../type/purchase';

const KIT_TYPES: { type: PurchaseType; caption: string; title: string; description: string }[] = [
  {
    type: 'KIT',
    caption: '평균 3~4일',
    title: '수거 키트 신청',
    description: '안전한 배송을 위한 전용 키트를 보내드려요',
  },
  {
    type: 'NONE_KIT',
    caption: '평균 1~2일',
    title: '키트 없이 신청',
    description: '직접 택배 포장 후 문 앞에 두시면 수거해요',
  },
];

const KitComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: PurchaseSelectState };

  const handleSelect = (purchaseType: PurchaseType) => {
    navigate('/address', { state: { ...state, purchaseType } });
  };

  return (
    <PickupBase>
      <PickupTitle>
        <Title>수거 키트 사용 여부를 선택해 주세요</Title>
        <PickupDes>
          박스나 완충재 준비가 어렵다면, 수거 키트를
          <br />
          이용하실 수 있어요
        </PickupDes>
      </PickupTitle>

      <TypeMenu>
        {KIT_TYPES.map(({ type, caption, title, description }) => (
          <li key={type}>
            <TypeButton type="button" onClick={() => handleSelect(type)}>
              <Caption>{caption}</Caption>
              <TypeTitle>
                <TypeName>{title}</TypeName>
                <TypeDes>{description}</TypeDes>
              </TypeTitle>
            </TypeButton>
          </li>
        ))}
        <Notice>
          견적은 입고 시 상태 기준으로 확인돼요
          <br />
          안전하게 포장해 주세요
        </Notice>
      </TypeMenu>
    </PickupBase>
  );
};
export default KitComponent;

const PickupBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 24px;
`;

const PickupTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.44px;
  color: #202938;
`;

const PickupDes = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.gray[500]};
`;

const TypeMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TypeButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 8px;
  background-color: #fff;
  text-align: left;
`;

const Caption = styled.span`
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.secondary[50]};
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.secondary[700]};
`;

const TypeTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TypeName = styled.strong`
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: #202938;
`;

const TypeDes = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.gray[500]};
`;

const Notice = styled.li`
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.gray[400]};
`;
