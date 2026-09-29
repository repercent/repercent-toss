import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PickupTypeSelect = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <PickupBase>
      <PickupTitle>
        <Title>보내는 방법을 선택해 주세요</Title>
        <PickupDes>배송비 부담 없이, 편한 방법으로 판매하세요</PickupDes>
      </PickupTitle>

      <TypeSection>
        <TypeMenu>
          <TypeItem>
            <TypeButton type="button" onClick={() => navigate('/kit', { state })}>
              <TypeInfo>
                <Captions>
                  <Caption $accent>추천</Caption>
                  <Caption>입금까지 1일</Caption>
                </Captions>
                <TypeTitle>
                  <TypeName>방문수거</TypeName>
                  <TypeDes>
                    문 앞에 두면 알아서 수거해요
                    <br />
                    전용 수거 키트를 먼저 보내드려요
                  </TypeDes>
                </TypeTitle>
              </TypeInfo>
              <TypeImg src="/img/pickup/kit.png" alt="" width={90} height={84} />
            </TypeButton>
          </TypeItem>

          <TypeItem>
            <TypeButton type="button" onClick={() => navigate('/csv', { state })}>
              <TypeInfo>
                <Captions>
                  <Caption>입금까지 1~4일</Caption>
                </Captions>
                <TypeTitle>
                  <TypeName>편의점 택배</TypeName>
                  <TypeDes>가까운 편의점에서 바로 보내요</TypeDes>
                </TypeTitle>
              </TypeInfo>
              <TypeImg src="/img/pickup/csv.png" alt="" width={90} height={84} />
            </TypeButton>
          </TypeItem>
        </TypeMenu>

        <Notice>*수거 일정은 택배사 사정에 따라 변동될 수 있어요</Notice>
      </TypeSection>
    </PickupBase>
  );
};
export default PickupTypeSelect;

const PickupBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 24px 24px 40px;
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

const TypeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TypeMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TypeItem = styled.li``;

const TypeButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 8px;
  background-color: #fff;
  text-align: left;
`;

const TypeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Captions = styled.div`
  display: flex;
  gap: 4px;
`;

const Caption = styled.span<{ $accent?: boolean }>`
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${({ $accent, theme }) =>
    $accent ? theme.secondary[700] : theme.secondary[50]};
  font-size: 12px;
  line-height: 18px;
  color: ${({ $accent, theme }) => ($accent ? '#fff' : theme.secondary[700])};
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

const TypeImg = styled.img`
  flex-shrink: 0;
  object-fit: contain;
`;

const Notice = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.gray[400]};
`;
