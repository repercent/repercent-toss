import { useState } from 'react';
import styled from 'styled-components';

import CertificateViewer from './CertificateViewer';

/**
 * 중고단말 안심거래사업자 배너. repercent-client `Common/Certification`과 같은 문구·인증 마크다.
 * client는 인증서 페이지(umts.or.kr)를 새 창으로 열지만, 미니앱은 외부 사이트로 내보낼 수 없어
 * 누르면 앱 안에서 인증서 원본(이미지)을 띄운다.
 */
const Certification = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <CertBanner type="button" onClick={() => setIsViewerOpen(true)}>
        <CertText>
          <CertSub>국내 최초 중고폰 안심거래사업자</CertSub>
          <CertTitle>정부가 인증한 표준 플랫폼, 리퍼센트</CertTitle>
        </CertText>
        <img
          src="/img/service/certification_mark_v2.png"
          alt="중고단말 안심거래 사업자 인증 마크"
          width={58}
          height={58}
        />
      </CertBanner>
      {isViewerOpen && <CertificateViewer onClose={() => setIsViewerOpen(false)} />}
    </>
  );
};

export default Certification;

const CertBanner = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 17px;
  width: 100%;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f4f8ff;
  text-align: left;

  & img {
    flex-shrink: 0;
  }
`;

const CertText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const CertSub = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #4c5564;
`;

const CertTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #111828;
`;
