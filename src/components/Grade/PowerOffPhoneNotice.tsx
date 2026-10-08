import styled from 'styled-components';

/** 등급별 예상 견적 아래 안내. repercent-client `Purchase/PowerOffPhoneNotice`와 같은 문구다. */
const PowerOffPhoneNotice = () => {
  return <Notice>전원이 켜지지 않는 단말기는 폐폰으로 처리될 수 있습니다.</Notice>;
};

export default PowerOffPhoneNotice;

const Notice = styled.p`
  width: 100%;
  padding: 8px 16px;
  border-radius: 10px;
  background-color: #f2f4f6;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.13px;
  color: #6b7380;
  text-align: center;
`;
