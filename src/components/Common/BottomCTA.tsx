import styled from 'styled-components';

import { ChildrenProps } from '../../type/common';
import { SAFE_AREA_BOTTOM } from '../../styles/safeArea';

interface BottomCTAProps extends ChildrenProps {
  /** 버튼 위에 노출되는 영역 (동의 체크박스 등) */
  upper?: React.ReactNode;
}

/** 화면 하단 고정 CTA 영역 */
const BottomCTA = ({ upper, children }: BottomCTAProps) => {
  return (
    <BottomCTABase>
      <TopGradient />
      <Container>
        {upper && <Upper>{upper}</Upper>}
        <ButtonArea>{children}</ButtonArea>
      </Container>
    </BottomCTABase>
  );
};

export default BottomCTA;

/** 위쪽 그라데이션은 본문이 비쳐 보이는 자리라 터치를 본문으로 넘기고, 흰 영역(Container)만 터치를 받는다. */
const BottomCTABase = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  width: 100%;
  max-width: 720px;
  min-width: 280px;
  pointer-events: none;
`;

const TopGradient = styled.div`
  height: 36px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
`;

const Container = styled.div`
  pointer-events: auto;
  background-color: #fff;
  padding-bottom: calc(20px + ${SAFE_AREA_BOTTOM});
`;

const Upper = styled.div`
  padding: 0 24px 26px;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 20px;

  & > button {
    flex: 1;
  }
`;
