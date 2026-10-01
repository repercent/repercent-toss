import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import CTAButton from './Button/CTAButton';

interface DialogProps {
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/** 확인/취소 두 버튼을 가진 확인 다이얼로그 */
const Dialog = ({
  title,
  description,
  cancelLabel = '취소',
  confirmLabel,
  loading = false,
  onCancel,
  onConfirm,
}: DialogProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <Overlay onClick={onCancel}>
      <DialogBox role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <ButtonRow>
          <CTAButton variant="secondary" size="large" onClick={onCancel}>
            {cancelLabel}
          </CTAButton>
          <CTAButton size="large" disabled={loading} onClick={onConfirm}>
            {confirmLabel}
          </CTAButton>
        </ButtonRow>
      </DialogBox>
    </Overlay>,
    document.body
  );
};

export default Dialog;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const DialogBox = styled.div`
  width: 100%;
  max-width: 335px;
  padding: 24px 20px 20px;
  border-radius: 24px;
  background-color: #fff;
`;

const Title = styled.h2`
  padding: 0 4px;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: -0.4px;
  color: #191f28;
`;

const Description = styled.p`
  margin-top: 8px;
  padding: 0 4px;
  font-size: 15px;
  line-height: 22px;
  color: #4e5968;
  white-space: pre-line;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;

  & > button {
    flex: 1;
  }
`;
