import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ChildrenProps } from '../../type/common';

interface BottomSheetProps extends ChildrenProps {
  open?: boolean;
  onClose: () => void;
}

const BottomSheet = ({ onClose, children }: BottomSheetProps) => {
  useEffect(() => {
    // 외부화면 스크롤방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 모달 밖 클릭시 모달 off
  const outside = useRef<HTMLDivElement | null>(null);
  const handleOutside = (e: MouseEvent) => {
    if (!outside.current?.contains(e.target as Node)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });

  return createPortal(
    <BottomBase>
      <BottomInner ref={outside}>
        <BottomContents>{children}</BottomContents>
      </BottomInner>
    </BottomBase>,
    document.body
  );
};

export default BottomSheet;

/* ===== styles ===== */

const BottomBase = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  z-index: 9999;
`;

const BottomInner = styled.div`
  background: #fff;
  position: absolute;
  bottom: 0;
  min-width: 280px;
  width: 100%;
  max-height: calc(var(--vh, 1vh) * 100 - 80px);
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0 0;

  transform: translateY(100%);
  animation: slideUp 0.35s ease forwards;

  @keyframes slideUp {
    to {
      transform: translateY(0);
    }
  }

  @media (min-width: 1000px) {
    max-width: 1300px;
  }
`;

const BottomContents = styled.div`
  position: relative;
  padding: 24px 0;
  overflow-y: auto;
`;
