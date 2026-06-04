import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function SubTextFiled({ children }: ChildrenProps) {
  return <SubTextFiledBase>{children}</SubTextFiledBase>;
}

const SubTextFiledBase = styled.div`
  background-color: ${({ theme }) => theme.primary[10]};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.secondary[700]};
  cursor: pointer;
`;
