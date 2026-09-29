import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BottomCTA from '../Common/BottomCTA';
import CTAButton from '../Common/Button/CTAButton';

const CompleteComponent = () => {
  const navigate = useNavigate();

  return (
    <CompleteBase>
      <Result>
        <IconBox>
          <img src="/ico/ico_check_circle.svg" alt="" width={60} height={60} />
        </IconBox>
        <TextBox>
          <Title>내 폰 팔기 신청이 완료됐어요</Title>
          <Description>진행 상황은 알림톡으로도 보내드려요.</Description>
        </TextBox>
      </Result>

      <BottomCTA>
        <CTAButton variant="secondary" onClick={() => navigate('/', { replace: true })}>
          닫기
        </CTAButton>
        <CTAButton onClick={() => navigate('/history', { replace: true })}>내역 보러가기</CTAButton>
      </BottomCTA>
    </CompleteBase>
  );
};

export default CompleteComponent;

const CompleteBase = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 112px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 40px 40px;
  text-align: center;
`;

const IconBox = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: -0.52px;
  color: #202938;
  word-break: keep-all;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 22.5px;
  color: rgba(3, 18, 40, 0.7);
`;
