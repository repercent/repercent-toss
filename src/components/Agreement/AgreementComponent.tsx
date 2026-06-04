import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import H2 from '../Common/Title/H2';
import H3 from '../Common/Title/H3';
import Button from '../Common/Button/Button';
import BottomSheet from '../Common/BottomSheet';

const AgreementComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [openBottom, setOpenBottom] = useState(false);
  const [selected, setSelected] = useState('Galaxy');
  const [isAgree, setIsAgree] = useState(false);

  const handleApply = async () => {
    const body = {
      ...state,
      subcategory: state.customModel ? state.customModel : state.subcategory,
    };

    try {
      const res = await axios.post(`/api/purchases/product`, body);
      navigate(`/purchase/complete/${res.data}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AgreementBase>
      <H2>빠른 판매를 위한 필수 체크</H2>

      <AgreementSection>
        <H3>1. 잠금 해제 & 계정 로그아웃 해주세요</H3>
        <AgreementDes>
          잠금 해제 또는 초기화가 되지 않은 기기는 정상적인 검수가 어려워요.
          <br />
          빠른 검수와 정확한 평가를 위해 계정 로그아웃 후 초기화를 꼭 진행해 주세요.
        </AgreementDes>
        <AgreementImg>
          <img
            src={'/img/agreement/agreement_1.webp'}
            alt="리퍼센트 인증 이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AgreementImg>
        <AgreementInfoBtn onClick={() => setOpenBottom(true)}>
          계정 로그아웃 하는 방법
        </AgreementInfoBtn>
      </AgreementSection>

      <AgreementSection>
        <H3>2. 데이터가 완전히 삭제돼요</H3>
        <AgreementImg>
          <img
            src={'/img/agreement/agreement_2.webp'}
            alt="리퍼센트 인증 이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AgreementImg>
        <AgreementDes>
          중요한 데이터는 꼭 미리 백업해 주세요.
          <br />
          리퍼센트는 글로벌 표준 ADISA 솔루션을 사용해 데이터를 영구 삭제하며, 삭제된 데이터는
          복구할 수 없어요.
        </AgreementDes>
      </AgreementSection>

      <AgreementSection>
        <H3>3. 필름, 케이스, 박스 등 부속품은 폐기돼요</H3>
        <AgreementImg>
          <img
            src={'/img/agreement/agreement_3.webp'}
            alt="리퍼센트 인증 이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AgreementImg>
        <AgreementDes>
          필름, 케이스, 박스 등 부속품은 입고 즉시 폐기되며, 반송되지 않아요. 기기만 보내주시면
          돼요.
        </AgreementDes>
      </AgreementSection>

      <AgreementSection>
        <H3>4. 안전하게 포장해 주세요</H3>
        <AgreementDes>
          견적은 입고 시 상태 기준으로 확인돼요. 배송 중 기기가 손상되지 않도록 완충재로 안전하게
          포장해 주세요.
        </AgreementDes>
      </AgreementSection>

      <AgreementSection>
        <H3>5. 검수 후 판매취소는 14일간 가능해요</H3>
        <AgreementDes>
          검수완료 및 견적발송 후 14일(주말 및 공휴일 포함)이 지나면 해당 조건에 따라 판매 확정
          처리돼요. 판매를 취소하실 경우 14일 이내에 꼭 신청해주세요.
        </AgreementDes>
      </AgreementSection>

      <AgreementSection>
        <H3>6. 도난/분실 기기 취급 불가</H3>
        <AgreementImg>
          <img
            src={'/img/agreement/agreement_4.webp'}
            alt="리퍼센트 인증 이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AgreementImg>
        <AgreementDes>
          리퍼센트는 관련 법규를 준수하며, 도난/분실 신고된 기기는 매입이 불가해요. 검수 과정에서
          확인될 경우 판매가 중단될 수 있어요.
        </AgreementDes>
      </AgreementSection>

      <BottomButton>
        <CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            checked={isAgree}
            onChange={() => setIsAgree((prev) => !prev)}
          />
          <CheckIcon $checked={isAgree} /> 내용을 모두 확인하였으며, 이에 동의합니다
        </CheckboxLabel>
        <Button disabled={!isAgree} onClick={handleApply}>
          확인
        </Button>
      </BottomButton>

      {openBottom && (
        <BottomSheet onClose={() => setOpenBottom(false)}>
          <BottomLayer>
            <SelectMenu>
              <SelectItem $selected={selected === 'Galaxy'} onClick={() => setSelected('Galaxy')}>
                갤럭시
              </SelectItem>
              <SelectItem $selected={selected === 'Apple'} onClick={() => setSelected('Apple')}>
                아이폰
              </SelectItem>
            </SelectMenu>
            <ImageBox>
              <img
                src={
                  selected === 'Galaxy' ? '/img/agreement/galaxy.webp' : '/img/agreement/apple.webp'
                }
                alt="리퍼센트 인증 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageBox>
          </BottomLayer>
        </BottomSheet>
      )}
    </AgreementBase>
  );
};
export default AgreementComponent;

const AgreementBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 16px 16px 120px;
`;

const AgreementSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AgreementDes = styled.p`
  color: ${({ theme }) => theme.gray[600]};
  font-size: 16px;
`;

const AgreementImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1029 / 336;
  border-radius: 20px;
  overflow: hidden;
`;

const AgreementInfoBtn = styled.button`
  background-color: ${({ theme }) => theme.primary[10]};
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.secondary[700]};
`;

const BottomButton = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  max-width: 1300px;
  min-width: 280px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;

  @media (min-width: 1000px) {
    position: relative;
  }
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckIcon = styled.span<{ $checked: boolean }>`
  background-size: cover;
  width: 18px;
  height: 18px;
  display: inline-block;
  ${({ $checked }) =>
    $checked
      ? `background-image: url("/ico/ico_check_checked.svg");`
      : `background-image: url("/ico/ico_check_default.svg");`}
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: -0.18px;
  cursor: pointer;
`;

const BottomLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 16px;
`;

const SelectMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SelectItem = styled.li<{ $selected?: boolean }>`
  background-color: ${({ $selected, theme }) => ($selected ? theme.gray[900] : '#fff')};
  padding: 6px 12px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.gray[900] : theme.gray[200])};
  border-radius: 30px;
  color: ${({ $selected, theme }) => ($selected ? '#fff' : theme.gray[500])};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 343 / 2661;
  padding: 0 16px;

  @media (min-width: 768px) {
    width: 50%;
    margin: 0 auto;
  }
`;
