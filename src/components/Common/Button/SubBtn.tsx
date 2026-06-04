import styled, { css } from 'styled-components';
// type
import { ButtonProps } from './Button';

export default function SubBtn({
  width = 100,
  color = 'blue',
  disabled = false,
  children,
  onClick,
  fontColor,
}: ButtonProps) {
  return (
    <Btn $width={width} $color={color} disabled={disabled} onClick={onClick} $fontColor={fontColor}>
      {children}
    </Btn>
  );
}

const Btn = styled.button<{
  $width: number;
  $color: string;
  disabled?: boolean;
  $fontColor?: string;
}>`
  background-color: ${({ theme }) => theme.secondary[700]};
  width: ${(props) => props.$width}%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;

  ${(props) =>
    props.$color === 'outline' &&
    css`
      background-color: #fff;
      border: 1px solid ${({ theme }) => theme.gray[200]};
      color: ${({ theme }) => theme.gray[600]};
      font-weight: 400;
    `}

  ${(props) =>
    props.$color === 'outline' &&
    props.$fontColor === 'primary' &&
    css`
      background-color: #fff;
      padding: 9px 0 10px 0;
      border: 1px solid ${({ theme }) => theme.gray[300]};
      color: ${({ theme }) => theme.primary[700]};
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.gray[200]};
    color: ${({ theme }) => theme.gray[600]};
  }
`;
