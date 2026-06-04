import styled, { css } from 'styled-components';
// type
import { ChildrenProps } from '../../../type/common';

export interface ButtonProps extends ChildrenProps {
  width?: number;
  color?: 'blue' | 'outline' | 'warn';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fontColor?: string;
}

export default function Button({
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
  background-color: ${({ theme }) => theme.primary[700]};
  width: ${(props) => props.$width}%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
  border-radius: 8px;
  font-weight: 600;

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
      border: 1px solid ${({ theme }) => theme.gray[200]};
      color: ${({ theme }) => theme.primary[700]};
      font-weight: 400;
    `}
    
  ${(props) =>
    props.$color === 'outline' &&
    props.$fontColor === 'warn' &&
    css`
      background-color: #fff;
      border: 1px solid ${({ theme }) => theme.gray[200]};
      color: ${({ theme }) => theme.pink[500]};
      font-weight: 400;
    `}

  ${(props) =>
    props.$color === 'warn' &&
    css`
      background-color: ${({ theme }) => theme.pink[500]};
      border: 1px solid ${({ theme }) => theme.pink[500]};
      font-weight: 400;
    `}


  &:disabled {
    background-color: ${({ theme }) => theme.gray[200]};
    color: ${({ theme }) => theme.gray[500]};
  }
`;
