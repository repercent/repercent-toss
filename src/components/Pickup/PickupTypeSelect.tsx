import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import H2 from '../Common/Title/H2';
import H3 from '../Common/Title/H3';

const PickupTypeSelect = () => {
  const navigate = useNavigate();

  return (
    <PickupBase>
      <PickupTitle>
        <H2>보내는 방법을 선택해 주세요</H2>
        <PickupDes>배송비 부담 없이, 편한 방법으로 판매하세요.</PickupDes>
      </PickupTitle>

      <TypeMenu>
        <TypeItem onClick={() => navigate('/kit')}>
          <TypeInfo>
            <RecommLabel>추천</RecommLabel>
            <TypeLabel>입금까지 1~4일</TypeLabel>
            <TypeTitle>
              <H3>방문수거</H3>
              <TypeDes>
                문 앞에 두면 알아서 수거해요
                <br />
                전용 수거 키트를 먼저 보내드려요
              </TypeDes>
            </TypeTitle>
          </TypeInfo>
          <TypeImg>
            <img src={'/img/pickup/kit.svg'} alt="방문수거 이미지" width={86} height={86} />
          </TypeImg>
        </TypeItem>

        <TypeItem onClick={() => navigate('/csv')}>
          <TypeInfo>
            <TypeLabel>입금까지 1~2일</TypeLabel>
            <TypeTitle>
              <H3>편의점 택배</H3>
              <TypeDes>가까운 편의점에서 바로 보내요</TypeDes>
            </TypeTitle>
          </TypeInfo>
          <TypeImg>
            <img src={'/img/pickup/csv.svg'} alt="편의점 택배 이미지" width={68} height={72} />
          </TypeImg>
        </TypeItem>

        <PickupDes>・ 수거 일정은 택배사 사정에 따라 변동될 수 있어요</PickupDes>
      </TypeMenu>
    </PickupBase>
  );
};
export default PickupTypeSelect;

const PickupBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 16px;
`;

const PickupTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  padding: 16px 16px 14px 16px;
  cursor: pointer;
`;

const TypeInfo = styled.div``;

const RecommLabel = styled.span`
  background-color: ${({ theme }) => theme.secondary[700]};
  padding: 4px;
  border-radius: 4px;
  color: #fff;
  margin-right: 4px;
  font-size: 12px;
`;

const TypeLabel = styled.span`
  background-color: ${({ theme }) => theme.secondary[50]};
  padding: 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.secondary[700]};
  font-size: 12px;
`;

const TypeTitle = styled.div`
  margin-top: 12px;
`;

const TypeDes = styled(PickupDes)`
  font-size: 14px;
`;

const TypeImg = styled.div`
  width: 90px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
