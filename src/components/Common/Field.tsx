import styled from 'styled-components';

import { ChildrenProps } from '../../type/common';

interface FieldProps extends ChildrenProps {
  label: string;
}

/** 라벨 + 입력 박스 묶음 */
export const Field = ({ label, children }: FieldProps) => {
  return (
    <FieldBase>
      <FieldLabel>{label}</FieldLabel>
      <FieldList>{children}</FieldList>
    </FieldBase>
  );
};

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export const FieldInput = ({ icon, ...inputProps }: FieldInputProps) => {
  return (
    <FieldBox>
      {icon && <img src={icon} alt="" width={24} height={24} />}
      <Input autoComplete="off" {...inputProps} />
    </FieldBox>
  );
};

interface FieldButtonProps extends ChildrenProps {
  icon?: string;
  placeholder?: boolean;
  onClick: () => void;
}

/** 입력 박스 모양의 선택 버튼 (주소 검색, 은행 선택 등) */
export const FieldButton = ({ icon, placeholder, onClick, children }: FieldButtonProps) => {
  return (
    <FieldBox as="button" type="button" onClick={onClick}>
      {icon && <img src={icon} alt="" width={24} height={24} />}
      <ButtonText $placeholder={placeholder}>{children}</ButtonText>
    </FieldBox>
  );
};

const FieldBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 0;
`;

const FieldLabel = styled.p`
  padding: 0 24px;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  color: rgba(0, 12, 30, 0.8);
`;

const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const FieldBox = styled.div`
  width: 100%;
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 0 16px;
  border: 1px solid rgba(0, 27, 55, 0.1);
  border-radius: 14px;
  background-color: #f9fafb;
  text-align: left;

  &:focus-within {
    border-color: #3182f6;
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  height: 46px;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  color: #191f28;

  &::placeholder {
    color: rgba(3, 24, 50, 0.46);
  }
`;

const ButtonText = styled.span<{ $placeholder?: boolean }>`
  flex: 1;
  padding: 11px 0;
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ $placeholder }) => ($placeholder ? 'rgba(3, 24, 50, 0.46)' : '#191f28')};
`;
