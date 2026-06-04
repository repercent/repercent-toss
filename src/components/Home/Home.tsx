import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import H1 from '../Common/Title/H1';
import H4 from '../Common/Title/H4';
import HomeInfo from './HomeInfo';
import Button from '../Common/Button/Button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeBase>
      {/* title */}
      <PurchaseTitle>
        <H1>
          같은 제품이어도<br></br>
          <strong>3,000원 </strong>더 받아가세요
        </H1>
      </PurchaseTitle>

      {/* product */}
      <PurchaseProductBox>
        <PurchaseWrapper>
          <ProductInfoBox>
            <ProductInfo>
              <H4>아이폰 13</H4>
              <ProductSeries>256GB A급</ProductSeries>
            </ProductInfo>
          </ProductInfoBox>
        </PurchaseWrapper>

        {/* price */}
        <PriceWrapper>
          <PriceBox>
            <AnotherCompany>A사</AnotherCompany>
            <AnotherPrice>2,500원</AnotherPrice>
          </PriceBox>
          <PriceBox>
            <AnotherCompany>B사</AnotherCompany>
            <AnotherPrice>6,000원</AnotherPrice>
          </PriceBox>
          <PriceBox>
            <CompanyName>리퍼센트</CompanyName>
            <Price>3,000원</Price>
          </PriceBox>
        </PriceWrapper>
      </PurchaseProductBox>

      {/* info */}
      <HomeInfo />

      <ButtonBtn>
        <Button onClick={() => navigate('/step')}>수거 신청하기</Button>
      </ButtonBtn>
    </HomeBase>
  );
};
export default Home;

const HomeBase = styled.main`
  position: relative;
  height: calc(var(--vh, 1vh) * 100);

  display: flex;
  flex-direction: column;
  gap: 28px;

  padding: 32px 16px;

  overflow-y: scroll;
`;

const PurchaseTitle = styled.div`
  & strong {
    color: ${({ theme }) => theme.primary[700]};
  }
`;

const PurchaseInfoImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PurchaseProductBox = styled.div`
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 8px;
`;

const PurchaseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
`;

const ProductInfoBox = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
`;

const ProductImg = styled.div`
  position: relative;
  width: 25%;
  aspect-ratio: 1 / 1;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProductSeries = styled.p`
  color: ${({ theme }) => theme.gray[600]};
`;

const ChangeBtn = styled.button`
  background: ${({ theme }) => theme.gray[600]};
  display: flex;
  gap: 4px;
  padding: 7px 12px 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const PriceWrapper = styled(PurchaseWrapper)`
  justify-content: space-around;
  border-top: 1px solid ${({ theme }) => theme.gray[100]};
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
`;

const CompanyName = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.gray[700]};
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.primary[700]};
`;

const AnotherCompany = styled(CompanyName)`
  color: ${({ theme }) => theme.gray[400]};
`;

const AnotherPrice = styled(Price)`
  font-weight: 400;

  color: ${({ theme }) => theme.gray[400]};
`;

const ButtonBtn = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  max-width: 720px;
  min-width: 280px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  gap: 16px;
`;
