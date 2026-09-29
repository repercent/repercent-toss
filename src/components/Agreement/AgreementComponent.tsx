import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseApplyState } from '../../type/purchase';
import { purchaseApi } from '../../utils/api';
import { getUserId } from '../../utils/user';
import { getErrorMessage } from '../../utils/format';
import useToast from '../../hooks/useToast';

import BottomCTA, { BOTTOM_CTA_SPACE } from '../Common/BottomCTA';
import CTAButton from '../Common/Button/CTAButton';
import Checkbox from '../Common/Checkbox';

const NOTICES = [
  {
    title: '2. 데이터는 완전히 삭제돼요',
    description:
      '중요한 데이터는 꼭 미리 백업해 주세요. 리퍼센트는 글로벌 표준 ADISA 솔루션을 사용해 데이터를 영구 삭제하며, 삭제된 데이터는 복구할 수 없어요.',
  },
  {
    title: '3. 필름, 케이스, 박스 등 부속품은 폐기돼요',
    description:
      '필름, 케이스, 박스 등 부속품은 입고 즉시 폐기되며, 반송되지 않아요. 기기만 보내주시면 돼요.',
  },
  {
    title: '4. 안전하게 포장해 주세요',
    description:
      '견적은 입고 시 상태 기준으로 확인돼요. 배송 중 기기가 손상되지 않도록 완충재로 안전하게 포장해 주세요.',
  },
  {
    title: '5. 검수 후 판매 확정은 7일 이내 가능해요',
    description:
      '검수완료 및 견적발송 후 7일이 지나면 자동으로 판매 확정 처리돼요. 판매를 취소하실 경우, 7일 이내에 꼭 신청해 주세요.',
  },
  {
    title: '6. 도난/분실 신고된 기기는 판매할 수 없어요',
    description:
      '리퍼센트는 관련 법규를 준수하며, 도난/분실 신고된 기기는 매입이 불가해요. 검수 과정에서 확인될 경우 판매가 중단될 수 있어요.',
  },
];

const AgreementComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: PurchaseApplyState | null };
  const showToast = useToast();

  const [isAgree, setIsAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = async () => {
    if (submitting) return;

    if (!state?.category || !state?.purchaseType) {
      showToast('신청 정보가 없어요. 처음부터 다시 신청해 주세요');
      navigate('/step', { replace: true });
      return;
    }

    const userId = getUserId();
    if (!userId) {
      showToast('로그인 정보를 확인할 수 없어요\n잠시 후 다시 시도해 주세요');
      return;
    }

    const body = {
      ...state,
      userId,
      subcategory: state.customModel ? state.customModel : state.subcategory,
    };

    setSubmitting(true);
    try {
      const res = await purchaseApi.post<number>(`/purchases/product`, body);
      navigate('/complete', { replace: true, state: { purchaseId: res.data } });
    } catch (err) {
      showToast(getErrorMessage(err, '신청에 실패했어요. 잠시 후 다시 시도해 주세요'));
      setSubmitting(false);
    }
  };

  return (
    <AgreementBase>
      <Top>
        <img src="/ico/ico_info_circle.svg" alt="" width={40} height={40} />
        <Title>판매 전 꼭 확인해주세요</Title>
      </Top>

      <Sections>
        <Section>
          <SectionTitle>1. 잠금 해제 & 계정 로그아웃 해주세요</SectionTitle>
          <SectionDes>
            잠금 해제 또는 초기화가 되지 않은 기기는 정상적인 검수가 어려워요. 빠른 검수와 정확한
            평가를 위해 계정 로그아웃 후 초기화를 꼭 진행해 주세요.
          </SectionDes>
          <GuideButton type="button" onClick={() => navigate('/logout-guide')}>
            계정 로그아웃 하는 방법
          </GuideButton>
        </Section>

        {NOTICES.map(({ title, description }) => (
          <Section key={title}>
            <SectionTitle>{title}</SectionTitle>
            <SectionDes>{description}</SectionDes>
          </Section>
        ))}
      </Sections>

      <BottomCTA
        upper={
          <Checkbox
            checked={isAgree}
            label="내용을 모두 확인하였으며, 이에 동의합니다"
            onChange={setIsAgree}
          />
        }
      >
        <CTAButton disabled={!isAgree || submitting} onClick={handleApply}>
          수거 신청하기
        </CTAButton>
      </BottomCTA>
    </AgreementBase>
  );
};
export default AgreementComponent;

const AgreementBase = styled.div`
  padding-bottom: ${BOTTOM_CTA_SPACE + 50}px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  line-height: 37px;
  letter-spacing: -0.56px;
  color: #191f28;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 24px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: #111828;
`;

const SectionDes = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #4c5564;
  word-break: keep-all;
`;

const GuideButton = styled.button`
  padding: 8px 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.primary[10]};
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.secondary[700]};
`;
