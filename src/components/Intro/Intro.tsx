import styled from 'styled-components';

import BottomCTA from '../Common/BottomCTA';
import CTAButton from '../Common/Button/CTAButton';
import { bottomCtaSpace } from '../Common/bottomCtaSpace';

interface IntroProps {
  onStart: () => void;
}

const STEPS = [
  {
    icon: '/img/intro/ico_phone_search.svg',
    title: '10초 만에 내 폰 시세 확인',
    description: '다른 곳보다 더 드려요',
  },
  {
    icon: '/img/intro/ico_truck.svg',
    title: '편한 방법으로 보내기',
    description: '배송비는 무료예요',
  },
  {
    icon: '/img/intro/ico_money_bag.svg',
    title: 'AI 검수로 빠른 견적 확인',
    description: '확정하면 1일 내 입금돼요',
  },
];

/** 토스 로그인 전에 보여 주는 서비스 소개 (Figma 366:3385) */
const Intro = ({ onStart }: IntroProps) => {
  return (
    <IntroBase>
      <Header>
        <Title>
          안 쓰는 폰,
          <br />
          <strong>리퍼센트</strong>에서 최고가로 팔기
        </Title>
        <SubTitle>정부 인증 중고폰 안심거래사업자예요</SubTitle>
      </Header>

      <HeroImage src="/img/intro/intro_phone.webp" alt="" width={228} height={205} />

      <StepList>
        {STEPS.map(({ icon, title, description }) => (
          <Step key={title}>
            <StepIcon>
              <img src={icon} alt="" width={52} height={52} />
            </StepIcon>
            <StepText>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </StepText>
          </Step>
        ))}
      </StepList>

      <BottomCTA>
        <CTAButton onClick={onStart}>시작하기</CTAButton>
      </BottomCTA>
    </IntroBase>
  );
};

export default Intro;

const IntroBase = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 28px 24px ${bottomCtaSpace()};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: -0.01em;
  color: #111828;
  word-break: keep-all;

  & strong {
    color: ${({ theme }) => theme.toss.blue};
  }
`;

const SubTitle = styled.p`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #4c5564;
`;

const HeroImage = styled.img`
  display: block;
  width: 228px;
  height: 205px;
  margin: 0 auto;
  object-fit: contain;
`;

const StepList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Step = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StepIcon = styled.div`
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background-color: #f3f4f6;

  & img {
    display: block;
  }
`;

const StepText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  letter-spacing: -0.01em;
`;

const StepTitle = styled.strong`
  font-size: 17px;
  font-weight: 600;
  line-height: 25px;
  color: #111828;
`;

const StepDescription = styled.span`
  font-size: 15px;
  line-height: 22px;
  color: #6b7380;
`;
