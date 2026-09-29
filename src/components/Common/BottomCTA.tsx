import styled from 'styled-components';

import { ChildrenProps } from '../../type/common';

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

/** 하단 CTA에 가려지지 않도록 본문 끝에 두는 여백 */
export const BOTTOM_CTA_SPACE = 132;

const BottomCTABase = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  width: 100%;
  max-width: 720px;
  min-width: 280px;
`;

const TopGradient = styled.div`
  height: 36px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  pointer-events: none;
`;

const Container = styled.div`
  background-color: #fff;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
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
