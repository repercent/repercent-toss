import styled, { css } from 'styled-components';

export interface ChipGroupProps {
  type?: 'product' | 'productDetail';
}
export interface ChipProps {
  active?: boolean;
  size?: 'sm' | 'md';
  disabled?: boolean;
  type?: 'product' | 'productDetail';
}

export const ChipGroup = styled.div<{ type?: 'product' | 'productDetail' }>`
  ${({ type }) =>
    type === 'productDetail'
      ? css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;

          @media (min-width: 768px) {
            grid-template-columns: repeat(4, 1fr);
          }
        `
      : css`
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        `}
`;

export const Chip = styled.button<ChipProps>`
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  font-size: 16px;

  ${({ type }) =>
    type === 'productDetail' &&
    css`
      width: 100%;
    `}

  ${({ size = 'md' }) =>
    size === 'md'
      ? css`
          height: 52px;
          // padding: 14px 34px;
        `
      : css`
          padding: 6px 12px;
        `}

  ${({ theme, active }) =>
    active
      ? css`
          border: 1px solid ${theme.primary[700]};
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
