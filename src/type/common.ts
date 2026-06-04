/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChildrenProps {
  children?: React.ReactNode;
}

// constant - option
export interface OptionProps {
  id?: string | number;
  label?: string;
}

export interface InputProps {
  value?: string;
  error?: boolean;
  errorMsg?: string;
  type?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FilterChipProps {
  label: string;
  color?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface RadioItemProps {
  label?: string;
  checked: boolean;
}

export interface PageMeta {
  last?: boolean;
  pageNo?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: 'blue' | 'outline' | 'warn';
}

type CardPaymentMethod = {
  code: 'CARD';
  cardCompany?: string;
};

export function isCardPaymentMethod(method: any): method is CardPaymentMethod {
  return method?.code === 'CARD';
}
