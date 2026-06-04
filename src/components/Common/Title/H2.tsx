import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function H2({ children }: ChildrenProps) {
  return <H2Base>{children}</H2Base>;
}

const H2Base = styled.h2`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.4px;
`;
