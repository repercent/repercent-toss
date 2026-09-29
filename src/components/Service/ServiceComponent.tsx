import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { faqData } from '../../constant/faq';
import { PRICE_COMPARISON, SERVICE_REVIEWS } from '../../constant/service';
import { formatPrice } from '../../utils/format';

import Button from '../Common/Button/Button';

const PICKUP_METHODS = [
  { image: '/img/service/step_kit.png', label: '방문 수거' },
  { image: '/img/service/step_csv.png', label: '편의점 택배' },
  { image: '/img/service/step_visit.png', label: '리퍼센트 방문' },
];

const ServiceComponent = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const goApply = () => navigate('/step');

  return (
    <ServiceBase>
      {/* 가격 비교 */}
      <Block>
        <MoneyImage src="/img/service/money_bundle.png" alt="" width={144} height={96} />
        <CompareBox>
          <CompareTitle>
            같은 제품이어도
            <br />
            <strong>{PRICE_COMPARISON.extra.toLocaleString('ko-KR')}원</strong> 더 받아가세요
          </CompareTitle>
          <CompareCard>
            <CompareProduct>
              <CompareProductImage>
                <img src="/img/service/product.png" alt="" width={60} height={60} />
              </CompareProductImage>
              <div>
                <CompareProductName>{PRICE_COMPARISON.product}</CompareProductName>
                <CompareProductSpec>{PRICE_COMPARISON.spec}</CompareProductSpec>
              </div>
            </CompareProduct>
            <ComparePrices>
              {PRICE_COMPARISON.prices.map(({ company, price, highlight }) => (
                <ComparePrice key={company} $highlight={highlight}>
                  <span>{company}</span>
                  <strong>{formatPrice(price)}</strong>
                </ComparePrice>
              ))}
            </ComparePrices>
          </CompareCard>
        </CompareBox>
        <CheckPriceButton type="button" onClick={goApply}>
          내 폰은 얼마인지 알아보기
        </CheckPriceButton>
      </Block>

      {/* 서비스 소개 */}
      <IntroSection>
        <IntroGroup>
          <SectionTitle>
            <small>원인 모를 감가는 이제 그만</small>
            중고폰 가격, 기준이 달라집니다
          </SectionTitle>
          <IntroCard
            src="/img/service/card_chart.jpg"
            alt="A사, B사, C사보다 리퍼센트의 견적이 가장 높아요"
            $ratio="343 / 243"
          />
          <IntroCard
            src="/img/service/card_ai.jpg"
            alt="사람의 주관적 판단이 들어가지 않아요. 리퍼센트는 AI 자동 검수 시스템으로 기기의 가치를 정확하고 투명하게 평가합니다"
            $ratio="343 / 260"
          />
        </IntroGroup>
        <IntroGroup>
          <SectionTitle>
            <small>개인정보 노출 없는</small>
            AI 자동화 검수센터
          </SectionTitle>
          <IntroCard
            src="/img/service/card_privacy.jpg"
            alt="개인정보 유출 가능성 Zero. 글로벌 표준 ADISA 데이터 삭제 솔루션으로 개인정보를 안전하게 삭제합니다"
            $ratio="343 / 240"
          />
          <IntroCard
            src="/img/service/card_auto.jpg"
            alt="사람이 기기를 켜서 확인하지 않아요. 검수부터 데이터 영구 삭제까지 자동화 공정으로 개인정보 유출 가능성을 원천 차단합니다"
            $ratio="343 / 240"
          />
        </IntroGroup>
      </IntroSection>

      {/* 거래 데이터 · 판매 후기 */}
      <TrustSection>
        <KpiSection>
          <KpiTitle>
            <small>압도적인 거래 데이터가 만든 신뢰</small>
            숫자로 증명하는 리퍼센트
          </KpiTitle>
          <KpiCards>
            <KpiCard>
              <KpiValue>100만+</KpiValue>
              <KpiLabel>누적 견적</KpiLabel>
              <KpiDescription>실거래 기반 시세 데이터</KpiDescription>
            </KpiCard>
            <KpiCard>
              <KpiValue>
                4.7<small>/ 5.0</small>
              </KpiValue>
              <KpiLabel>고객만족도</KpiLabel>
              <KpiDescription>실사용자 평균 평점</KpiDescription>
            </KpiCard>
          </KpiCards>
        </KpiSection>

        {/* 판매 후기 */}
        <ReviewSection>
          {SERVICE_REVIEWS.map((review) => (
            <ReviewCard key={review.title}>
              <ReviewRating>
                {Array.from({ length: 5 }, (_, i) => (
                  <img key={i} src="/ico/star/full.svg" alt="" width={14} height={14} />
                ))}
                <span>5</span>
              </ReviewRating>
              <ReviewBody>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewContent>{review.content}</ReviewContent>
              </ReviewBody>
              <ReviewMeta>
                <span>
                  {review.grade} <strong>{review.model}</strong> {review.storage} {review.color}
                </span>
                <span>
                  {review.author} {review.date}
                </span>
              </ReviewMeta>
            </ReviewCard>
          ))}
        </ReviewSection>
      </TrustSection>

      {/* 안심거래 */}
      <Block>
        <CertBanner>
          <div>
            <CertSub>국내 최초 중고폰 안심거래사업자</CertSub>
            <CertTitle>정부가 인증한 표준 플랫폼, 리퍼센트</CertTitle>
          </div>
          <img
            src="/img/service/safe_logo.png"
            alt="중고단말 안심거래 사업자 인증"
            width={58}
            height={58}
          />
        </CertBanner>
      </Block>

      {/* 진행 과정 */}
      <Block>
        <BlockTitle>이렇게 진행돼요</BlockTitle>
        <ProcessList>
          <ProcessItem>
            <ProcessHead>
              <NumberBadge>1</NumberBadge>
              30초 내 폰 팔기 신청
            </ProcessHead>
          </ProcessItem>
          <ProcessItem>
            <ProcessHead>
              <NumberBadge>2</NumberBadge>
              <div>
                핸드폰 수거
                <ProcessSub>원하는 방법으로 편하게 보내세요</ProcessSub>
              </div>
            </ProcessHead>
            <PickupMethods>
              {PICKUP_METHODS.map(({ image, label }) => (
                <PickupMethod key={label}>
                  <img src={image} alt="" height={75} />
                  <Pill>{label}</Pill>
                </PickupMethod>
              ))}
            </PickupMethods>
          </ProcessItem>
          <ProcessItem>
            <ProcessHead>
              <NumberBadge>3</NumberBadge>
              AI 자동 검수
            </ProcessHead>
          </ProcessItem>
          <ProcessItem>
            <ProcessHead>
              <NumberBadge>4</NumberBadge>
              검수 결과 및 견적 전달
            </ProcessHead>
          </ProcessItem>
          <ResultCards>
            <ResultCard $tone="positive">
              <ResultTitle>견적에 만족해요</ResultTitle>
              <ResultPill $tone="positive">금액 입금</ResultPill>
              <img src="/img/service/satisfied.png" alt="" height={93} />
            </ResultCard>
            <ResultCard $tone="negative">
              <ResultTitle>견적이 아쉬워요</ResultTitle>
              <ResultPill $tone="negative">무료 반품</ResultPill>
              <img src="/img/service/unsatisfied.png" alt="" height={93} />
            </ResultCard>
          </ResultCards>
        </ProcessList>
      </Block>

      {/* 자주 묻는 질문 */}
      <Block>
        <BlockTitle>자주 묻는 질문</BlockTitle>
        <FaqList>
          {faqData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <FaqItem key={faq.question}>
                <FaqQuestion
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <NumberBadge>Q</NumberBadge>
                  <FaqText>{faq.question}</FaqText>
                  <img
                    src={isOpen ? '/ico/ico_arrow_up.svg' : '/ico/ico_arrow_down.svg'}
                    alt=""
                    width={16}
                    height={16}
                  />
                </FaqQuestion>
                {isOpen && <FaqAnswer>{faq.answer}</FaqAnswer>}
              </FaqItem>
            );
          })}
        </FaqList>
      </Block>

      <BottomButton>
        <Button onClick={goApply}>수거 신청하기</Button>
      </BottomButton>
    </ServiceBase>
  );
};

export default ServiceComponent;

const ServiceBase = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0 124px;
`;

const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
`;

const MoneyImage = styled.img`
  display: block;
`;

const CompareBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CompareTitle = styled.h1`
  padding: 0 8px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.4px;
  color: #202938;

  & strong {
    color: ${({ theme }) => theme.primary[700]};
  }
`;

const CompareCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border: 1px solid #d7edf6;
  border-radius: 14px;
  background-color: #f9fafc;
`;

const CompareProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CompareProductImage = styled.div`
  width: 60px;
  height: 60px;
`;

const CompareProductName = styled.p`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  color: #000;
`;

const CompareProductSpec = styled.p`
  margin-top: 4px;
  font-size: 13px;
  line-height: 14px;
  color: #4c5564;
`;

const ComparePrices = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 80px;
  border: 1px solid #f5f7f8;
  border-radius: 12px;
  background-color: #fff;
`;

const ComparePrice = styled.div<{ $highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;

  & span {
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    color: ${({ $highlight }) => ($highlight ? '#384152' : '#9CA2AE')};
  }

  & strong {
    font-size: 15px;
    font-weight: ${({ $highlight }) => ($highlight ? 600 : 400)};
    line-height: 18px;
    color: ${({ $highlight, theme }) => ($highlight ? theme.primary[700] : '#9CA2AE')};
  }
`;

const CheckPriceButton = styled.button`
  height: 44px;
  border-radius: 10px;
  background-color: #ebf2ff;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary[700]};
`;

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 16px;
`;

const IntroGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #111828;

  & small {
    font-size: 16px;
    line-height: 24px;
    color: #6b7380;
  }
`;

const IntroCard = styled.img<{ $ratio: string }>`
  display: block;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: 12px;
  background-color: #202938;
  object-fit: cover;
`;

const TrustSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const KpiSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 16px;
`;

const KpiTitle = styled.h2`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 21px;
  font-weight: 700;
  line-height: 27px;
  color: #1a1a1a;

  & small {
    font-size: 13px;
    font-weight: 500;
    line-height: 21px;
    color: #007aff;
  }
`;

const KpiCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const KpiCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px 12px;
  border: 1px solid #edf4f9;
  border-radius: 12px;
  background: linear-gradient(160deg, #fafbfd 0%, #f2faff 100%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const KpiValue = styled.strong`
  font-size: 29px;
  font-weight: 700;
  line-height: 32px;
  color: #007aff;

  & small {
    margin-left: 2px;
    font-size: 14px;
    color: #555;
  }
`;

const KpiLabel = styled.p`
  margin-top: 3px;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  color: #1a1a1a;
`;

const KpiDescription = styled.p`
  margin-top: 4px;
  font-size: 11px;
  line-height: 16px;
  color: #6b7685;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 32px 16px;
  background-color: #f4f8ff;
`;

const ReviewCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & span {
    margin-left: 8px;
    font-size: 14px;
    color: #384152;
  }
`;

const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReviewTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #202938;
`;

const ReviewContent = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: #4c5564;
`;

const ReviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  line-height: 18px;
  color: #9ca2ae;

  & strong {
    font-weight: 700;
  }
`;

const CertBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 17px;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f4f8ff;
`;

const CertSub = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #4c5564;
`;

const CertTitle = styled.p`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #111828;
`;

const BlockTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #111828;
`;

const ProcessList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProcessItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 12px;
  background-color: #f9fafc;
`;

const ProcessHead = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #111828;
`;

const ProcessSub = styled.p`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #384152;
`;

const NumberBadge = styled.span`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: #4c5564;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
`;

const PickupMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const PickupMethod = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & img {
    display: block;
  }
`;

const Pill = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  background-color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  color: #384152;
  white-space: nowrap;
`;

const ResultCards = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const ResultCard = styled.div<{ $tone: 'positive' | 'negative' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px 8px;
  border: 1px solid ${({ $tone }) => ($tone === 'positive' ? '#269BFF' : '#FF9EB5')};
  border-radius: 12px;
  background-color: ${({ $tone }) => ($tone === 'positive' ? '#F4F8FF' : '#F9FAFC')};
`;

const ResultTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #4c5564;
`;

const ResultPill = styled.span<{ $tone: 'positive' | 'negative' }>`
  padding: 4px 10px;
  border-radius: 20px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ $tone, theme }) => ($tone === 'positive' ? theme.primary[700] : theme.pink[500])};
`;

const FaqList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const FaqItem = styled.li`
  border-bottom: 1px solid #e6e7eb;
`;

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 14px 0;
  text-align: left;

  & img {
    margin-top: 2px;
  }
`;

const FaqText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  color: #202938;
`;

const FaqAnswer = styled.p`
  padding: 0 0 16px 28px;
  font-size: 14px;
  line-height: 21px;
  color: #111828;
  white-space: pre-line;
`;

const BottomButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  width: 100%;
  max-width: 720px;
  min-width: 280px;
  padding: 8px 16px calc(8px + env(safe-area-inset-bottom));
  background-color: #fff;
`;
