import styled from 'styled-components';

interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  return (
    <CheckboxLabel>
      <HiddenInput type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <img
        src={checked ? '/ico/ico_checkbox_checked.svg' : '/ico/ico_checkbox_default.svg'}
        alt=""
        width={24}
        height={24}
      />
      <LabelText>{label}</LabelText>
    </CheckboxLabel>
  );
};

export default Checkbox;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

const LabelText = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 19, 43, 0.58);
`;
