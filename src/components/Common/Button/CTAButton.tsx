import styled, { css } from 'styled-components';

import { ChildrenProps } from '../../../type/common';

type Variant = 'primary' | 'secondary';
type Size = 'xlarge' | 'large' | 'small';

interface CTAButtonProps extends ChildrenProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/** 토스 디자인 시스템 스타일 버튼 (XL 56 / L 48 / S 32) */
const CTAButton = ({
  variant = 'primary',
  size = 'xlarge',
  disabled = false,
  children,
  onClick,
}: CTAButtonProps) => {
  return (
    <Btn type="button" $variant={variant} $size={size} disabled={disabled} onClick={onClick}>
      {children}
    </Btn>
  );
};

export default CTAButton;

const sizeStyles = {
  xlarge: css`
    height: 56px;
    border-radius: 16px;
    font-size: 17px;
    line-height: 24px;
  `,
  large: css`
    height: 48px;
    border-radius: 14px;
    font-size: 17px;
    line-height: 24px;
  `,
  small: css`
    height: 32px;
    border-radius: 8px;
    font-size: 13px;
    line-height: 18px;
  `,
};

const Btn = styled.button<{ $variant: Variant; $size: Size }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
  transition: filter 0.15s ease;

  ${({ $size }) => sizeStyles[$size]}

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          background-color: #3182f6;
          color: #fff;
        `
      : css`
          background-color: rgba(7, 25, 76, 0.05);
          color: rgba(3, 18, 40, 0.7);
        `}

  &:active:not(:disabled) {
    filter: brightness(0.94);
  }

  &:disabled {
    opacity: 0.3;
  }
`;
