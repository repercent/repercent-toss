import { useState } from 'react';
import styled from 'styled-components';

import { ShippingInfo } from '../../type/purchase';

import H2 from '../Common/Title/H2';
import H5 from '../Common/Title/H5';
import Input from '../Common/Input';
import Button from '../Common/Button/Button';
import DaumPost from '../Common/DaumPost';

export interface AddressProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  handleApply: () => void;
  isDisabled: boolean;
}

const Address = ({ shippingInfo, setShippingInfo, handleApply, isDisabled }: AddressProps) => {
  const [openAddr, setOpenAddr] = useState(false);

  return (
    <AddressBase>
      <H2>기본 정보를 입력해 주세요</H2>
      <InputBox>
        <H5>주소</H5>
        {shippingInfo.zipcode === '' ? (
          <AddressSearchBox onClick={() => setOpenAddr(true)}>
            <img src={'/ico/ico_search.svg'} alt="검색 아이콘" width={18} height={18} />
            우편번호 찾기
          </AddressSearchBox>
        ) : (
          <>
            <AddressBox onClick={() => setOpenAddr(true)}>
              <Postcode>{`[${shippingInfo.zipcode}]`}</Postcode>
              <AddressDes>{shippingInfo.address1}</AddressDes>
            </AddressBox>
            <Input
              type="text"
              name="address2"
              value={shippingInfo.address2}
              placeholder="상세주소를 입력해 주세요"
              onChange={(e) => setShippingInfo((prev) => ({ ...prev, address2: e.target.value }))}
            />
          </>
        )}
      </InputBox>
      <InputBox>
        <H5>이름</H5>
        <Input
          name="name"
          value={shippingInfo.name}
          placeholder="이름을 입력해 주세요"
          onChange={(e) => setShippingInfo((prev) => ({ ...prev, name: e.target.value }))}
        />
      </InputBox>
      <InputBox>
        <H5>연락처</H5>
        <Input
          type="tel"
          name="phone"
          value={shippingInfo.phone}
          placeholder="휴대폰 번호를 입력해 주세요"
          onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </InputBox>

      <BottomButton>
        <Button disabled={isDisabled} onClick={handleApply}>
          확인
        </Button>
      </BottomButton>

      {openAddr && (
        <DaumPost
          onClose={() => setOpenAddr(false)}
          onComplete={({ zonecode, address }) =>
            setShippingInfo((prev) => ({
              ...prev,
              zipcode: zonecode,
              address1: address,
            }))
          }
        />
      )}
    </AddressBase>
  );
};
export default Address;

const AddressBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 16px 16px 120px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AddressBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.gray[200]};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

const AddressSearchBox = styled(AddressBox)`
  color: ${({ theme }) => theme.gray[400]};
`;

const RecentlyBox = styled.div`
  color: ${({ theme }) => theme.gray[500]};
`;

const CheckIcon = styled.span<{ $checked: boolean }>`
  background-size: cover;
  width: 16px;
  height: 16px;
  display: inline-block;
  ${({ $checked }) =>
    $checked
      ? `background-image: url("/ico/ico_check_checked.svg");`
      : `background-image: url("/ico/ico_check_default.svg");`}
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: -0.18px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const RecentlyAddress = styled.p`
  padding-left: 24px;
`;

const Postcode = styled.span`
  margin-right: 4px;
`;

const AddressDes = styled.p``;

const BottomButton = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  max-width: 720px;
  min-width: 280px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  gap: 16px;
`;
