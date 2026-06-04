import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState, ShippingInfo } from '../../type/purchase';

import H2 from '../Common/Title/H2';
import Address from './Address';

const CsvComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: PurchaseSelectState };

  const [csvCompany, setCsvCompany] = useState('');
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
        purchaseType: csvCompany,
        ...shippingInfo,
      },
    });
  };

  const isEmptyValue = (obj: ShippingInfo) =>
    Object.values(obj).some((value) => value.trim() === '');

  const isDisabled = csvCompany.trim() === '' || isEmptyValue(shippingInfo);

  return (
    <>
      {csvCompany === '' ? (
        <PickupBase>
          <PickupTitle>
            <H2>보내실 편의점을 선택해 주세요</H2>
            <PickupDes>
              선택이 완료되면 예약번호가 발급돼요 <br />
              기기를 포장한 후, 선택한 편의점에서 접수해 주세요
            </PickupDes>
          </PickupTitle>

          <TypeMenu>
            <TypeItem onClick={() => setCsvCompany('EMART')}>
              <ImageBox>
                <img
                  src={'/ico/ico_pickup_emart.svg'}
                  alt="emart icon"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </ImageBox>
            </TypeItem>

            <TypeItem onClick={() => setCsvCompany('CU')}>
              <CuBox>
                <img
                  src={'/ico/ico_pickup_cu.svg'}
                  alt="cu icon"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </CuBox>
            </TypeItem>
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
export default CsvComponent;

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
  gap: 16px;
`;

const TypeItem = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  padding: 16px;
  cursor: pointer;
`;

const ImageBox = styled.div`
  position: relative;
  width: 90%;
  aspect-ratio: 1 / 1;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const CuBox = styled(ImageBox)`
  width: 60%;

  @media (min-width: 768px) {
    width: 30%;
  }
`;
