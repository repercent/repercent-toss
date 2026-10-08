import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface HomeProps {
  /** 판매 내역 카드 보조 문구 (진행 중인 판매 건수 또는 로그인 안내) */
  saleSummary: string;
  onOpenHistory: () => void;
}

const INFO_CARDS = [
  { icon: '/ico/ico_home_grade.svg', label: '투명한\n등급 시세' },
  { icon: '/ico/ico_home_time.svg', label: '30초면\n신청 완료' },
  { icon: '/ico/ico_home_deposit.svg', label: '검수 후\n빠른 입금' },
];

const Home = ({ saleSummary, onOpenHistory }: HomeProps) => {
  const navigate = useNavigate();

  return (
    <HomeBase>
      <Header>
        <Title>
          내 폰, <strong>최고가</strong>에 팔아보세요
        </Title>
        <SubTitle>30초 만에 시세 확인부터 수거 신청까지</SubTitle>
      </Header>

      <HeroImage>
        <img src="/img/home/money.png" alt="5만 원권 지폐" width={219} height={155} />
      </HeroImage>

      <InfoSection>
        <ActionSection>
          <PrimaryAction type="button" onClick={() => navigate('/step')}>
            수거 신청하기
            <img src="/ico/ico_chevron_white.svg" alt="" width={20} height={20} />
          </PrimaryAction>
          <SecondaryAction type="button" onClick={() => navigate('/service')}>
            서비스 알아보기
            <img src="/ico/ico_chevron_gray.svg" alt="" width={22} height={22} />
          </SecondaryAction>
        </ActionSection>

        <InfoCards>
          {INFO_CARDS.map(({ icon, label }) => (
            <InfoCard key={label}>
              <img src={icon} alt="" width={24} height={24} />
              <InfoLabel>{label}</InfoLabel>
            </InfoCard>
          ))}
        </InfoCards>

        <SaleCard type="button" onClick={onOpenHistory}>
          <SaleInfo>
            <SaleTitle>판매 내역</SaleTitle>
            <SaleCount>{saleSummary}</SaleCount>
          </SaleInfo>
          <img src="/ico/ico_chevron_gray.svg" alt="" width={22} height={22} />
        </SaleCard>
      </InfoSection>
    </HomeBase>
  );
};
export default Home;

const HomeBase = styled.main`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: -0.8px;
  color: #191f28;

  & strong {
    color: ${({ theme }) => theme.toss.blue};
  }
`;

const SubTitle = styled.p`
  font-size: 15px;
  line-height: 22.5px;
  color: #8b95a1;
`;

const float = keyframes`
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(-2deg);
  }
`;

const floatSubtle = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

/**
 * 이미지 원본 비율(438×393)이 칸(219×155)과 달라 늘어나지 않게 비율을 유지해 가운데 맞춘다.
 * iOS '동작 줄이기'를 켠 기기에서도 멈춰 보이지 않도록, 그때는 회전 없이 작게만 움직인다.
 */
const HeroImage = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    object-fit: contain;
    animation: ${float} 3s ease-in-out infinite;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    & img {
      animation: ${floatSubtle} 4s ease-in-out infinite;
    }
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  border-radius: 20px;
  background: linear-gradient(90deg, ${({ theme }) => theme.toss.blue} 0%, #2779ef 100%);
  box-shadow: 0 0 12px rgba(49, 130, 246, 0.16);

  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  color: #fff;
`;

const SecondaryAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #e5e8eb;
  border-radius: 20px;
  background-color: #fff;

  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #191f28;
`;

const InfoCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const InfoCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 12px 0;
  border-radius: 16px;
  background-color: #f7f8fa;
`;

const InfoLabel = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  color: #4e5968;
  text-align: center;
  white-space: pre-line;
`;

const SaleCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #f2f4f6;
  border-radius: 20px;
  background-color: #fff;
  text-align: left;
`;

const SaleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SaleTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #191f28;
`;

const SaleCount = styled.span`
  font-size: 13px;
  line-height: 15px;
  color: #8b95a1;
`;
