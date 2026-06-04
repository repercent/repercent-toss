import styled, { css } from 'styled-components';
import { FilterChipProps } from '@/type/common';

export interface ColorGridProps {
  type?: 'product' | 'productDetail';
}

export function ColorChip({
  label,
  color,
  active,
  showPrice = false,
  disabled,
  variant = 'grid',
  onClick,
  price,
}: FilterChipProps & {
  showPrice?: boolean;
  variant?: 'grid' | 'pill';
  price?: number | null;
  onClick?: () => void;
}) {
  return (
    <ColorItem active={active} variant={variant} disabled={disabled} onClick={onClick}>
      <Dot $color={color} $type={color === '랜덤' ? 'random' : 'normal'} />
      <Label active={active}>{label}</Label>
      {showPrice && price && <Price>{price?.toLocaleString()}원</Price>}
    </ColorItem>
  );
}

export const ColorGrid = styled.div<ColorGridProps>`
  ${({ type }) =>
    type === 'productDetail'
      ? css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;

          @media (min-width: 768px) {
            grid-template-columns: repeat(4, 1fr);
          }
        `
      : css`
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        `}
`;

const ColorItem = styled.button<{ active?: boolean; variant?: 'grid' | 'pill' }>`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant = 'grid' }) =>
    variant === 'grid'
      ? css`
          flex-direction: column;
          gap: 4px;
          padding: 8px 12px;
          border-radius: 8px;
        `
      : css`
          gap: 8px;
          padding: 6px 12px 6px 8px;
          border-radius: 50px;
        `}

  ${({ theme, active }) =>
    active
      ? css`
          border: 1px solid ${theme.secondary[700]};
          color: ${theme.primary[700]};
        `
      : css`
          border: 1px solid ${theme.gray[200]};
          color: ${theme.gray[600]};
        `}


  &:disabled {
    background-color: ${({ theme }) => theme.gray[100]};
    color: ${({ theme }) => theme.gray[400]};
    border: 1px solid ${({ theme }) => theme.gray[200]};
  }
`;

const Dot = styled.span<{ $color?: string; $type: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.gray[200]};

  ${({ $type, $color }) => {
    switch ($type) {
      case 'random':
        return `
          background-image: url("/ico/ico_random_color.svg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      case 'silver':
        return `
          background-image: url("/ico/ico_silver_color.svg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      default:
        return `
          background-color: ${$color};
        `;
    }
  }}
`;

const Label = styled.span<{ active?: boolean }>`
  font-size: 14px;
`;

const Price = styled.p`
  min-height: 14px;
  font-size: 10px;
  color: ${({ theme }) => theme.gray[400]};
  line-height: 0.5;
`;
