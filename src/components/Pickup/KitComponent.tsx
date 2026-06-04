import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState, ShippingInfo } from '../../type/purchase';

import H2 from '../Common/Title/H2';
import H3 from '../Common/Title/H3';
import Address from './Address';

const KitComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: PurchaseSelectState };

  const [purchaseType, setPurchaseType] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    phone: '',
    zipcode: '',
    address1: '',
    address2: '',
    memo: '메모',
    memoText: '메모',
  });

  const handleApply = () => {
    navigate('/agreement', {
      state: {
        ...state,
        purchaseType,
        ...shippingInfo,
      },
    });
  };

  const isEmptyValue = (obj: ShippingInfo) =>
    Object.values(obj).some((value) => value.trim() === '');

  const isDisabled = purchaseType.trim() === '' || isEmptyValue(shippingInfo);

  return (
    <>
      {purchaseType === '' ? (
        <PickupBase>
          <PickupTitle>
            <H2>수거 키트 사용 여부를 선택해 주세요</H2>
            <PickupDes>박스나 완충재 준비가 어렵다면, 수거 키트를 이용하실 수 있어요</PickupDes>
          </PickupTitle>

          <TypeMenu>
            <TypeItem onClick={() => setPurchaseType('KIT')}>
              <TypeLabel>평균 3~4일</TypeLabel>
              <TypeTitle>
                <H3>수거 키트 신청</H3>
                <TypeDes>안전한 배송을 위한 전용 키트를 보내드려요</TypeDes>
              </TypeTitle>
            </TypeItem>

            <TypeItem onClick={() => setPurchaseType('NONE_KIT')}>
              <TypeLabel>평균 1~2일</TypeLabel>
              <TypeTitle>
                <H3>키트 없이 신청</H3>
                <TypeDes>직접 택배 포장 후 문 앞에 두시면 수거해요</TypeDes>
              </TypeTitle>
            </TypeItem>

            <TypeInfo>
              <TypeDesItem>
                견적은 입고 시 상태 기준으로 확인돼요. 안전하게 포장해 주세요
              </TypeDesItem>
              <TypeDesItem>
                한 키트에 최대 5개까지만 넣는걸 권장해요. 그 이상이라면 별도의 박스를 준비해주셔야
                해요
              </TypeDesItem>
            </TypeInfo>
          </TypeMenu>
        </PickupBase>
      ) : (
        <Address
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          handleApply={handleApply}
          isDisabled={isDisabled}
        />
      )}
    </>
  );
};
export default KitComponent;

const PickupBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 16px;
`;

const PickupTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PickupDes = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.gray[400]};
`;

const TypeMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TypeItem = styled.li`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  padding: 16px;
  cursor: pointer;
`;

const TypeLabel = styled.span`
  background-color: ${({ theme }) => theme.secondary[50]};
  padding: 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.secondary[700]};
`;

const TypeTitle = styled.div`
  margin-top: 12px;
`;

const TypeDes = styled(PickupDes)`
  font-size: 14px;
`;

const TypeInfo = styled.ul``;

const TypeDesItem = styled.li`
  position: relative;
  font-size: 14px;
  color: ${({ theme }) => theme.gray[400]};
  padding-left: 12px;
  &:before {
    position: absolute;
    content: '*';
    left: 0;
  }
`;
