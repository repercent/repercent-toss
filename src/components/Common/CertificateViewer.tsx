import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { graniteEvent } from '@apps-in-toss/web-framework';
import styled from 'styled-components';

import { SAFE_AREA_BOTTOM } from '../../styles/safeArea';

interface CertificateViewerProps {
  onClose: () => void;
}

/**
 * 중고단말 안심거래사업자 인증서 원본을 전체 화면으로 보여 준다 (Figma 317:2224).
 * 미니앱은 토스 밖 사이트로 이동하거나 그 내용을 띄울 수 없어(비게임 체크리스트 '보안 및 안정성')
 * 인증서 페이지(umts.or.kr)를 여는 대신, 그 페이지의 인증서(열람용)를 이미지로 담아 앱 안에서 보여 준다.
 * 뒤 화면은 그대로 두므로 닫으면 보던 스크롤 위치로 돌아간다. 열려 있는 동안 시스템 뒤로가기는 닫기로 처리한다.
 * 핀치 줌을 쓸 수 없어 인증서를 누르면 두 배로 키워 스크롤로 볼 수 있게 한다.
 */
const CertificateViewer = ({ onClose }: CertificateViewerProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);

    let unsubscribe = () => {};
    try {
      unsubscribe = graniteEvent.addEventListener('backEvent', {
        onEvent: () => onCloseRef.current(),
        onError: () => {},
      });
    } catch {
      // 이벤트 브리지가 없는 환경
    }

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', handleKeyDown);
      unsubscribe();
    };
  }, []);

  return createPortal(
    <ViewerBase role="dialog" aria-modal="true" aria-label="중고 단말 안심 거래 사업자 인증서">
      <ViewerHeader>
        <CloseButton ref={closeButtonRef} type="button" aria-label="닫기" onClick={onClose}>
          <img src="/ico/ico_close_m.svg" alt="" width={24} height={24} />
        </CloseButton>
      </ViewerHeader>

      <ViewerBody>
        <ZoomButton
          type="button"
          $zoomed={isZoomed}
          aria-pressed={isZoomed}
          aria-label={isZoomed ? '인증서 작게 보기' : '인증서 크게 보기'}
          onClick={() => setIsZoomed((v) => !v)}
        >
          <img
            src="/img/service/certificate.png"
            alt="중고 단말 안심 거래 사업자 인증서. 인증번호 AC-20250623-A0003, 상호 21세기전파상, 영업장 명칭 리퍼센트, 영업장 주소 경기 성남시 수정구 대왕판교로 815 7층 770호, 온라인 주소 https://repercent.com, 인증 구분 매입/판매(온라인), 유효기간 2030.06.23. 2025.06.23 한국정보통신진흥협회장"
            width={952}
            height={1248}
          />
        </ZoomButton>
        <Hint>
          {isZoomed ? '한 번 더 누르면 원래 크기로 돌아가요' : '인증서를 누르면 크게 볼 수 있어요'}
        </Hint>
      </ViewerBody>
    </ViewerBase>,
    document.body
  );
};

export default CertificateViewer;

const ViewerBase = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const ViewerHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  padding: 4px 8px 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
`;

const ViewerBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 8px 16px calc(32px + ${SAFE_AREA_BOTTOM});
`;

const ZoomButton = styled.button<{ $zoomed: boolean }>`
  display: block;
  width: ${({ $zoomed }) => ($zoomed ? '200%' : '100%')};
  cursor: ${({ $zoomed }) => ($zoomed ? 'zoom-out' : 'zoom-in')};

  & img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Hint = styled.p`
  margin-top: 12px;
  font-size: 13px;
  line-height: 20px;
  color: #8b95a1;
  text-align: center;
`;
