import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseGrade, PurchaseSelectState } from '../../type/purchase';

import H2 from '../Common/Title/H2';
import H5 from '../Common/Title/H5';
import BottomSheet from '../Common/BottomSheet';
import Button from '../Common/Button/Button';

interface GradeProps {
  gradeDetail: PurchaseGrade[];
  minPrice: number;
  maxPrice: number;
  gradeImage: string;
  purchase: PurchaseSelectState;
  onClick: () => void;
}

const GradeComponent = (props: GradeProps) => {
  const { gradeDetail, minPrice, maxPrice, onClick, gradeImage, purchase } = props;
  const navigate = useNavigate();

  const [openBottom, setOpenBottom] = useState(false);

  const getGradeIconPath = (grade: string) => `/ico/grade/${grade}.svg`;

  const getPriceDiffInfo = (price: number, prePrice: number) => {
    if (price > prePrice) return { icon: '/ico/ico_price_asc.svg', diff: price - prePrice };
    if (price < prePrice) return { icon: '/ico/ico_price_desc.svg', diff: prePrice - price };
    return { icon: '/ico/ico_price_equl.svg', diff: 0 };
  };

  return (
    <ScdSection>
      {/* 예상 시세 */}
      <PriceInfoWrapper>
        <PriceInfoTitle>
          <H2>예상시세</H2>
          <ChangeBtn onClick={() => navigate('/step')}>
            <img src={'/ico/ico_undo.svg'} alt="변경 아이콘" width={16} height={16} />
            모델 재선택
          </ChangeBtn>
        </PriceInfoTitle>

        <PriceInfo>
          <ProductInfoBox>
            <ProductImg>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${gradeImage}`}
                alt="제품 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </ProductImg>
            <ProductInfo>
              <ProductSeries>
                {purchase?.category} {purchase?.model} {purchase?.storage}
              </ProductSeries>
              <ProductPrice>
                <Price>
                  {minPrice.toLocaleString('ko-KR')}~{maxPrice.toLocaleString('ko-KR')}원
                </Price>
              </ProductPrice>
            </ProductInfo>
          </ProductInfoBox>
        </PriceInfo>
      </PriceInfoWrapper>

      {/* 등급별 가격 */}
      <GradeMenu>
        <GradeItem>
          <GradeTitle>
            <TitleBox onClick={() => setOpenBottom(true)}>
              <H5>등급별 예상 견적</H5>
              <img src="/ico/ico_tooltip.svg" alt="tooltip 아이콘" width={20} height={20} />
            </TitleBox>
            <GradeDes>저번 달 대비</GradeDes>
          </GradeTitle>
        </GradeItem>

        {gradeDetail.map(({ grade, description, price, prePrice }) => {
          const { icon, diff } = getPriceDiffInfo(price, prePrice);
          return (
            <GradeItem key={grade}>
              <GradeItemBox>
                <GradePriceBox>
                  <img
                    src={getGradeIconPath(grade)}
                    alt={`${grade} 아이콘`}
                    width={20}
                    height={20}
                  />
                  <GradePriceInfo>
                    <GradePrice>{price.toLocaleString('ko-KR')}원</GradePrice>
                    <GradeInfo>{description}</GradeInfo>
                  </GradePriceInfo>
                </GradePriceBox>

                <DiffAmountBox>
                  <img src={icon} alt="price diff 아이콘" width={18} height={18} />
                  <DiffAmount>{diff.toLocaleString('ko-KR')}원</DiffAmount>
                </DiffAmountBox>
              </GradeItemBox>
            </GradeItem>
          );
        })}
      </GradeMenu>

      {/* BottomBtn */}
      <BottomButton>
        <Button onClick={onClick}>판매하기</Button>
      </BottomButton>

      {openBottom && (
        <BottomSheet onClose={() => setOpenBottom(false)}>
          <BottomBox>
            <ImageBox>
              <img
                src={'/img/grade/grade_range.png'}
                alt="등급 기준 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageBox>
          </BottomBox>
        </BottomSheet>
      )}
    </ScdSection>
  );
};
export default GradeComponent;

const ScdSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 16px 16px 120px;
`;

const PriceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PriceInfoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChangeBtn = styled.button`
  background: ${({ theme }) => theme.primary[700]};
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;
`;

const Price = styled.strong`
  margin-right: 2px;
  color: ${({ theme }) => theme.secondary[700]};
`;

const PriceInfo = styled.div`
  background-color: ${({ theme }) => theme.gray[50]};
  padding: 16px;
  border-radius: 8px;
`;

const ProductInfoBox = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
`;

const ProductImg = styled.div`
  position: relative;
  width: 15%;
  aspect-ratio: 1 / 1;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
`;

const ProductSeries = styled.p`
  color: ${({ theme }) => theme.gray[500]};
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.gray[400]};
  font-size: 18px;
  font-weight: 600;
`;

const GradeMenu = styled.ul``;

const GradeItem = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray[100]};
  &:first-child {
    border-bottom: 1.5px solid ${({ theme }) => theme.gray[300]};
  }
  &:last-child {
    border-bottom: none;
  }
`;

const GradeTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleBox = styled.div`
  display: flex;
  gap: 4px;
`;

const GradeDes = styled.p`
  color: ${({ theme }) => theme.gray[600]};
`;

const GradeItemBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const GradePriceBox = styled.div`
  display: flex;
  gap: 12px;
`;

const GradePriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GradePrice = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const GradeInfo = styled.p`
  color: ${({ theme }) => theme.gray[400]};
`;

const DiffAmountBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 6px;
`;

const DiffAmount = styled.span``;

const BottomBox = styled.div`
  padding: 24px 16px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 686 / 1766;
  @media (min-width: 768px) {
    width: 50%;
    margin: 24px auto 0;
  }
`;

const BottomButton = styled.div`
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
