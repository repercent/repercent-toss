import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function H3({ children }: ChildrenProps) {
  return <H3Base>{children}</H3Base>;
}

const H3Base = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: -0.18px;
`;
