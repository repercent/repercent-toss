import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function TextFiled({ children }: ChildrenProps) {
  return <TextFiledBase>{children}</TextFiledBase>;
}

const TextFiledBase = styled.div`
  background-color: ${({ theme }) => theme.secondary[50]};
  padding: 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.secondary[700]};
`;
