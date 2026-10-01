import styled from 'styled-components';
// type
import { ChildrenProps } from '@/type/common';

export default function H5({ children }: ChildrenProps) {
  return <H5Base>{children}</H5Base>;
}

const H5Base = styled.h5`
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.14px;
`;
