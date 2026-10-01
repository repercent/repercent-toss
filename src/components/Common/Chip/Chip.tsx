import styled from 'styled-components';

interface ChipProps {
  label: string | number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Chip = ({ label, selected, disabled, onClick }: ChipProps) => {
  return (
    <ChipButton $selected={selected} disabled={disabled} onClick={onClick}>
      {label}
    </ChipButton>
  );
};

export default Chip;

const ChipButton = styled.button<{ $selected?: boolean }>`
  // width: 31%;
  min-height: 48px;
  padding: 14px 4px;
  border-radius: 12px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.secondary[700] : theme.gray[200])};
  color: ${({ $selected, theme }) => ($selected ? theme.primary[700] : theme.gray[600])};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
`;
