import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function H1({ children }: ChildrenProps) {
  return <H1Base>{children}</H1Base>;
}

const H1Base = styled.h1`
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.52px;
`;
