import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState } from '../../type/purchase';

const CSV_COMPANIES = [
  { company: 'EMART', label: '이마트24', logo: '/ico/ico_pickup_emart.svg', width: 126 },
  { company: 'CU', label: 'CU', logo: '/ico/ico_pickup_cu.svg', width: 80 },
];

const CsvComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: PurchaseSelectState };

  const handleSelect = (csvCompany: string) => {
    navigate('/address', { state: { ...state, purchaseType: 'CSV', csvCompany } });
  };

  return (
    <PickupBase>
      <PickupTitle>
        <Title>보내실 편의점을 선택해 주세요</Title>
        <PickupDes>
          선택이 완료되면 예약번호가 발급돼요
          <br />
          기기를 포장한 후, 선택한 편의점에서 접수해 주세요
        </PickupDes>
      </PickupTitle>

      <TypeMenu>
        {CSV_COMPANIES.map(({ company, label, logo, width }) => (
          <li key={company}>
            <TypeButton type="button" aria-label={label} onClick={() => handleSelect(company)}>
              <img src={logo} alt="" width={width} />
            </TypeButton>
          </li>
        ))}
      </TypeMenu>
    </PickupBase>
  );
};
export default CsvComponent;

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const TypeButton = styled.button`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 8px;
  background-color: #fff;

  & img {
    max-width: 100%;
  }
`;
