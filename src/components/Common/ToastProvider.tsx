import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

import { ChildrenProps } from '../../type/common';
import { ToastContext } from '../../context/ToastContext';
import { SAFE_AREA_BOTTOM } from '../../styles/safeArea';

const TOAST_DURATION = 2500;

const ToastProvider = ({ children }: ChildrenProps) => {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast &&
        createPortal(
          <ToastBase key={toast.id} role="status">
            {toast.message}
          </ToastBase>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const ToastBase = styled.div`
  position: fixed;
  left: 50%;
  bottom: calc(176px + ${SAFE_AREA_BOTTOM});
  z-index: 1100;
  transform: translateX(-50%);

  width: max-content;
  max-width: calc(100% - 40px);
  padding: 12px 20px;
  border-radius: 14px;
  background-color: rgba(25, 31, 40, 0.9);

  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  color: #fff;
  text-align: center;
  white-space: pre-line;

  animation: ${fadeIn} 0.2s ease;
`;
