import styled from 'styled-components';

import { openExternalURL } from '../../utils/toss';

/** 중고단말 안심거래사업자 인증서 (한국정보통신진흥협회) */
const CERTIFICATE_URL = 'https://www.umts.or.kr/certificate/AC20250623A0003';

/**
 * 중고단말 안심거래사업자 배너. repercent-client `Common/Certification`과 같은 문구·인증 마크이고,
 * 누르면 인증서 페이지를 연다. 토스 앱에서는 브리지로 열어 닫으면 보던 위치로 돌아온다.
 */
const Certification = () => {
  return (
    <CertBanner type="button" onClick={() => openExternalURL(CERTIFICATE_URL)}>
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
