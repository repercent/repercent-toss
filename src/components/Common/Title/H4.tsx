import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function H4({ children }: ChildrenProps) {
  return <H4Base>{children}</H4Base>;
}

const H4Base = styled.h4`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.16px;
`;
