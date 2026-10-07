import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState, ShippingInfo } from '../../type/purchase';

import AddressSearch from './AddressSearch';
import BottomCTA from '../Common/BottomCTA';
import { bottomCtaSpace } from '../Common/bottomCtaSpace';
import CTAButton from '../Common/Button/CTAButton';
import { Field, FieldButton, FieldInput } from '../Common/Field';

/** 주소 검색은 해시로 열어 기기 뒤로가기로 닫히게 함 */
const SEARCH_HASH = '#address-search';

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PurchaseSelectState;
  const isSearchOpen = location.hash === SEARCH_HASH;

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    phone: '',
    zipcode: '',
    address1: '',
    address2: '',
  });

  const update = (key: keyof ShippingInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setShippingInfo((prev) => ({ ...prev, [key]: e.target.value }));

  const isDisabled = Object.values(shippingInfo).some((value) => value.trim() === '');

  const openSearch = () => navigate({ hash: SEARCH_HASH }, { state });

  const closeSearch = () => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate({ hash: '' }, { replace: true, state });
  };

  const handleSelectAddress = ({ zipcode, address }: { zipcode: string; address: string }) => {
    setShippingInfo((prev) => ({ ...prev, zipcode, address1: address }));
    closeSearch();
    // 검색 화면이 닫힌 뒤 상세 주소 입력으로 포커스 이동
    setTimeout(() => document.getElementById('address2')?.focus(), 100);
  };

  const handleApply = () => {
    navigate('/agreement', {
      state: {
        ...state,
        ...shippingInfo,
      },
    });
  };

  return (
    <AddressBase>
      <Title>기본 정보를 입력해 주세요</Title>

      <Fields>
        <Field label="이름">
          <FieldInput
            name="name"
            value={shippingInfo.name}
            placeholder="이름을 입력해주세요"
            onChange={update('name')}
          />
        </Field>

        <Field label="주소">
          <FieldButton
            icon="/ico/ico_search_placeholder.svg"
            placeholder={!shippingInfo.zipcode}
            onClick={openSearch}
          >
            {shippingInfo.zipcode
              ? `[${shippingInfo.zipcode}] ${shippingInfo.address1}`
              : '우편번호 찾기'}
          </FieldButton>
          <FieldInput
            id="address2"
            name="address2"
            value={shippingInfo.address2}
            placeholder="상세 주소를 입력해 주세요"
            onChange={update('address2')}
          />
        </Field>

        <Field label="연락처">
          <FieldInput
            type="tel"
            inputMode="numeric"
            name="phone"
            maxLength={11}
            value={shippingInfo.phone}
            placeholder="연락처를 입력해 주세요"
            onChange={(e) =>
              setShippingInfo((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))
            }
          />
        </Field>
      </Fields>

      <BottomCTA>
        <CTAButton disabled={isDisabled} onClick={handleApply}>
          수거 신청하기
        </CTAButton>
      </BottomCTA>

      {isSearchOpen && <AddressSearch onSelect={handleSelectAddress} onClose={closeSearch} />}
    </AddressBase>
  );
};
export default Address;

const AddressBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0 ${bottomCtaSpace()};
`;

const Title = styled.h2`
  padding: 0 24px;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.44px;
  color: #202938;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
`;
