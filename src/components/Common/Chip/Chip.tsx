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
  min-height: 48px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.secondary[700] : theme.gray[200])};
  color: ${({ $selected, theme }) => ($selected ? theme.primary[700] : theme.gray[700])};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
`;
