import styled from 'styled-components';
// type
import { InputProps } from '../../type/common';

const Input = (props: InputProps) => {
  const {
    value = '',
    error,
    errorMsg,
    type = 'text',
    placeholder = '입력해주세요',
    name,
    disabled,
    onChange,
  } = props;

  // onkeypress
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange({
        target: {
          name,
          value: (e.target as HTMLInputElement).value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <InputBase disabled={disabled}>
        <InputBox
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={onChange}
          disabled={disabled}
          onKeyDown={handleOnKeyPress}
        />
      </InputBase>
      {error && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </>
  );
};

export default Input;

/* ===== styles ===== */

const InputBase = styled.div<{ disabled?: boolean }>`
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 8px;

  background-color: ${({ disabled, theme }) => (disabled ? theme.gray[50] : '#fff')};

  color: ${({ disabled, theme }) => (disabled ? theme.gray[400] : 'inherit')};

  &:focus-within {
    border-color: ${({ theme }) => theme.secondary[700]};
  }
`;

const InputBox = styled.input`
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 400;
  &::placeholder {
    color: ${({ theme }) => theme.gray[400]};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.gray[50]};
    color: ${({ theme }) => theme.gray[400]};
  }
`;

const ClearBtn = styled.button`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMsg = styled.p`
  padding: 0 12px;
  color: ${({ theme }) => theme.red[600]};
`;
