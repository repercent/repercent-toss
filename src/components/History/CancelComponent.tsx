import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CancelReasonGroup } from '../../constant/purchase';

import BottomCTA from '../Common/BottomCTA';
import { bottomCtaSpace } from '../Common/bottomCtaSpace';
import CTAButton from '../Common/Button/CTAButton';

interface CancelProps {
  reasonGroups: CancelReasonGroup[];
  submitting: boolean;
  onSubmit: (reason: string) => void;
}

const MAX_REASON_LENGTH = 200;

const CancelComponent = ({ reasonGroups, submitting, onSubmit }: CancelProps) => {
  const [selected, setSelected] = useState<{ reason: string; isEtc?: boolean } | null>(null);
  const [etcReason, setEtcReason] = useState('');

  const cancelReason = selected?.isEtc ? etcReason.trim() : selected?.reason;

  // '직접 입력'은 목록 맨 아래에 새로 생겨 하단 버튼 뒤에 깔리므로, 고르면 입력칸을 화면 가운데로 올린다.
  const etcBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected?.isEtc) etcBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selected?.isEtc]);

  return (
    <CancelBase>
      <Title>취소 사유를 알려주세요</Title>

      <Groups>
        {reasonGroups.map(({ category, reasons }) => (
          <Group key={category}>
            <GroupTitle>{category}</GroupTitle>
            <ReasonList>
              {reasons.map((item) => {
                const checked = selected?.reason === item.reason;
                return (
                  <li key={item.reason}>
                    <ReasonLabel>
                      <HiddenRadio
                        type="radio"
                        name="cancelReason"
                        checked={checked}
                        onChange={() => setSelected(item)}
                      />
                      <img
                        src={checked ? '/ico/ico_radio_checked.svg' : '/ico/ico_radio_default.svg'}
                        alt=""
                        width={20}
                        height={20}
                      />
                      {item.reason}
                    </ReasonLabel>
                  </li>
                );
              })}
            </ReasonList>
          </Group>
        ))}

        {selected?.isEtc && (
          <EtcBox ref={etcBoxRef}>
            <EtcInput
              value={etcReason}
              maxLength={MAX_REASON_LENGTH}
              placeholder="취소 사유를 입력해 주세요"
              onChange={(e) => setEtcReason(e.target.value)}
            />
            <Count>
              {etcReason.length}/{MAX_REASON_LENGTH}
            </Count>
          </EtcBox>
        )}
      </Groups>

      <BottomCTA>
        <CTAButton
          disabled={!cancelReason || submitting}
          onClick={() => cancelReason && onSubmit(cancelReason)}
        >
          판매 취소하기
        </CTAButton>
      </BottomCTA>
    </CancelBase>
  );
};

export default CancelComponent;

const CancelBase = styled.div`
  padding: 24px 24px ${bottomCtaSpace()};
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: #202938;
`;

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 32px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GroupTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  color: #6b7380;
`;

const ReasonList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReasonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  line-height: 24px;
  color: #202938;
  word-break: keep-all;
  cursor: pointer;
`;

const HiddenRadio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

const EtcBox = styled.div`
  margin-top: -12px;
  /* 입력할 때 키보드·하단 버튼에 가리지 않도록 스크롤 기준에 버튼 높이를 더한다 */
  scroll-margin-bottom: ${bottomCtaSpace()};
  padding: 12px 16px;
  border: 1px solid rgba(0, 27, 55, 0.1);
  border-radius: 14px;
  background-color: #f9fafb;

  &:focus-within {
    border-color: ${({ theme }) => theme.toss.blue};
  }
`;

const EtcInput = styled.textarea`
  width: 100%;
  height: 96px;
  resize: none;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  color: #191f28;

  &::placeholder {
    color: rgba(3, 24, 50, 0.46);
  }
`;

const Count = styled.p`
  font-size: 13px;
  color: #9ca2ae;
  text-align: right;
`;
