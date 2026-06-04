import { useState } from 'react';

import styled from 'styled-components';
import H2 from '../Common/Title/H2';
import { faqData } from '../../constant/faq';

const HomeInfo = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <HomeInfoBase>
      <PurchaseDesSection>
        <PurchaseTitle>
          <PurchaseSubTitle>원인 모를 감가는 이제 그만</PurchaseSubTitle>
          <H2>중고폰 가격, 기준이 달라집니다</H2>
        </PurchaseTitle>

        <PurchaseImg src={'/img/purchase/purchase1.webp'} alt="매입 설명 이미지" />
        <PurchaseImg src={'/img/purchase/purchase2.webp'} alt="매입 설명 이미지" />
      </PurchaseDesSection>

      <PurchaseDesSection>
        <PurchaseTitle>
          <PurchaseSubTitle>개인정보 노출 없는</PurchaseSubTitle>
          <H2>AI 자동화 검수센터</H2>
        </PurchaseTitle>
        <PurchaseImg src={'/img/purchase/purchase3.webp'} alt="매입 설명 이미지" />
        <PurchaseImg src={'/img/purchase/purchase4.webp'} alt="매입 설명 이미지" />
      </PurchaseDesSection>

      <PurchaseDesSection>
        <SubTitle>
          <PurchaseSubTitle>숫자가 증명하는 리퍼센트의 신뢰</PurchaseSubTitle>
          <H2>압도적인 거래 데이터</H2>
        </SubTitle>
        <PurchaseImgWrapper>
          <PurchaseDesImg src={'/img/purchase/purchase_data1.png'} alt="누적견적" />
          <PurchaseDesImg src={'/img/purchase/purchase_data2.png'} alt="고객만족도" />
        </PurchaseImgWrapper>
      </PurchaseDesSection>

      <PurchaseDesSection>
        <H2>이렇게 진행돼요</H2>

        <ProgressMenu>
          <ProgressItem>
            <ProgressBox>
              <ProgressIcon src={`/ico/rank/ico_black_${1}.svg`} alt="순서 아이콘 1" />
              <Progress>30초 내 폰 팔기 신청</Progress>
            </ProgressBox>
          </ProgressItem>
          <ProgressItem>
            <ProgressBox>
              <ProgressIcon src={`/ico/rank/ico_black_${2}.svg`} alt="순서 아이콘 2" />

              <div>
                <Progress>핸드폰 수거</Progress>
                <ProgressSub>원하는 방법으로 편하게 보내세요</ProgressSub>
              </div>
            </ProgressBox>
            <ProgressImgWrapper>
              <ProgressImgBox>
                <ProgressImg src="img/pickup/kit.svg" alt="kit 아이콘" />
                <ProgressImgDes>방문 수거</ProgressImgDes>
              </ProgressImgBox>
              <ProgressImgBox>
                <ProgressImg src="img/pickup/csv.svg" alt="편의점 아이콘" />

                <ProgressImgDes>편의점 택배</ProgressImgDes>
              </ProgressImgBox>
              <ProgressImgBox>
                <ProgressImg src="img/pickup/visit.svg" alt="방문 아이콘" />

                <ProgressImgDes>리퍼센트 방문</ProgressImgDes>
              </ProgressImgBox>
            </ProgressImgWrapper>
          </ProgressItem>
          <ProgressItem>
            <ProgressBox>
              <ProgressIcon src={`/ico/rank/ico_black_${3}.svg`} alt="순서 아이콘 3" />

              <Progress>AI 자동 검수</Progress>
            </ProgressBox>
          </ProgressItem>

          <ProgressItem>
            <ProgressBox>
              <ProgressIcon src={`/ico/rank/ico_black_${4}.svg`} alt="순서 아이콘 4" />

              <Progress>검수 결과 및 견적 전달</Progress>
            </ProgressBox>
          </ProgressItem>
        </ProgressMenu>

        <PurchaseInfoImg src="/img/purchase/purchase5.png" alt="매입 설명 이미지" />
      </PurchaseDesSection>

      <PurchaseDesSection>
        <FAQTitle>자주 묻는 질문</FAQTitle>
        <FAQList>
          {faqData.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleItem(index)}>
                <FAQQuestionLeft>
                  <FAQIcon src="/ico/ico_faq.svg" alt="순서 아이콘" />
                  <FAQQuestionText>{faq.question}</FAQQuestionText>
                </FAQQuestionLeft>
                <Chevron $isOpen={openIndex === index}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Chevron>
              </FAQQuestion>
              <FAQAnswerWrap $isOpen={openIndex === index}>
                <FAQAnswerInner>
                  <FAQDivider />
                  <FAQAnswerText>{faq.answer}</FAQAnswerText>
                </FAQAnswerInner>
              </FAQAnswerWrap>
            </FAQItem>
          ))}
        </FAQList>
      </PurchaseDesSection>
    </HomeInfoBase>
  );
};
export default HomeInfo;

const HomeInfoBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 0 0 120px;
`;

const PurchaseDesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PurchaseTitle = styled.div``;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PurchaseSubTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.gray[500]};
`;

const PurchaseImg = styled.img`
  display: block;
  width: 100%;
`;

const ProgressMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
`;

const ProgressItem = styled.li`
  background-color: ${({ theme }) => theme.gray[50]};
  border-radius: 12px;
  padding: 16px;
`;

const ProgressBox = styled.div`
  display: flex;
  algin-items: center;
  gap: 12px;
`;

const ProgressIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Progress = styled.p`
  color: ${({ theme }) => theme.gray[900]};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const ProgressSub = styled.span`
  color: ${({ theme }) => theme.gray[700]};
`;

const ProgressImg = styled.img`
  width: 87px;
  height: 87px;
`;

const ProgressImgWrapper = styled.div`
  display: flex;
  margin-top: 12px;
`;

const ProgressImgBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const ProgressImgDes = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  color: ${({ theme }) => theme.gray[700]};
  font-size: 14px;
  font-weight: 600;
`;

const PurchaseImgWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const PurchaseInfoImg = styled.img`
  margin-top: 20px;
`;

const PurchaseDesImg = styled.img`
  width: 48%;
`;

const FAQTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.gray[900]};
  line-height: 1.5;
`;

const FAQList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FAQItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.gray[200]};
`;

const FAQQuestion = styled.button`
  background-color: ${({ theme }) => theme.secondary[50]};

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const FAQQuestionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FAQQuestionText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.gray[900]};
  text-align: left;
  line-height: 1.4;
`;

const Chevron = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  min-width: 20px;
  color: ${({ theme }) => theme.gray[500]};
  transition: transform 0.25s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
`;

const FAQAnswerWrap = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.25s ease;
`;

const FAQAnswerInner = styled.div`
  overflow: hidden;
`;

const FAQDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.gray[200]};
  margin-bottom: 12px;
`;

const FAQAnswerText = styled.p`
  line-height: 1.6;
  white-space: pre-line;
  padding-bottom: 16px;
`;

const FAQIcon = styled.img`
  width: 24px;
  height: 24px;
`;
