import { useState } from 'react';
import styled from 'styled-components';

import { BANK_LIST } from '../../constant/purchase';
import { formatPrice } from '../../utils/format';

import BottomCTA from '../Common/BottomCTA';
import { bottomCtaSpace } from '../Common/bottomCtaSpace';
import BottomSheet from '../Common/BottomSheet';
import CTAButton from '../Common/Button/CTAButton';
import Checkbox from '../Common/Checkbox';
import { Field, FieldButton, FieldInput } from '../Common/Field';

export interface AccountForm {
  bankCode: string;
  holder: string;
  accountNumber: string;
}

interface AccountProps {
  price: number | null;
  submitting: boolean;
  onSubmit: (form: AccountForm) => void;
}

const AccountComponent = ({ price, submitting, onSubmit }: AccountProps) => {
  const [openBank, setOpenBank] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [form, setForm] = useState<AccountForm>({ bankCode: '', holder: '', accountNumber: '' });

  const bank = BANK_LIST.find(({ code }) => code === form.bankCode);
  const isValid = !!form.bankCode && !!form.holder && !!form.accountNumber && isAgree;

  return (
    <AccountBase>
      <Header>
        <Title>입금받으실 계좌 정보를 알려주세요</Title>
        {price != null && (
          <Description>
            판매 금액 <strong>{formatPrice(price)}</strong>
          </Description>
        )}
      </Header>

      <div>
        <Field label="은행">
          <FieldButton
            icon={bank ? `/img/bank/${bank.code}.svg` : undefined}
            placeholder={!bank}
            onClick={() => setOpenBank(true)}
          >
            {bank?.name ?? '은행 선택'}
          </FieldButton>
        </Field>
        <Field label="예금주">
          <FieldInput
            name="holder"
            value={form.holder}
            placeholder="예금주명을 입력해 주세요"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, holder: e.target.value.replace(/\s/g, '') }))
            }
          />
        </Field>
        <Field label="계좌번호">
          <FieldInput
            type="tel"
            inputMode="numeric"
            name="accountNumber"
            value={form.accountNumber}
            placeholder="'-' 없이 숫자만 입력해 주세요"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, accountNumber: e.target.value.replace(/\D/g, '') }))
            }
          />
        </Field>
      </div>

      <BottomCTA
        upper={
          <Checkbox
            checked={isAgree}
            label="이용약관 및 개인정보 처리방침에 동의합니다"
            onChange={setIsAgree}
          />
        }
      >
        <CTAButton disabled={!isValid || submitting} onClick={() => onSubmit(form)}>
          확인
        </CTAButton>
      </BottomCTA>

      {openBank && (
        <BottomSheet onClose={() => setOpenBank(false)}>
          <SheetTitle>은행을 선택해 주세요</SheetTitle>
          <BankGrid>
            {BANK_LIST.map(({ code, name }) => (
              <li key={code}>
                <BankButton
                  type="button"
                  $selected={code === form.bankCode}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, bankCode: code }));
                    setOpenBank(false);
                  }}
                >
                  <img src={`/img/bank/${code}.svg`} alt="" width={24} height={24} />
                  {name}
                </BankButton>
              </li>
            ))}
          </BankGrid>
        </BottomSheet>
      )}
    </AccountBase>
  );
};

export default AccountComponent;

const AccountBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0 ${bottomCtaSpace(50)};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 24px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: #202938;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #6b7380;

  & strong {
    font-weight: 700;
    color: ${({ theme }) => theme.secondary[700]};
  }
`;

const SheetTitle = styled.h3`
  padding: 0 24px 16px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #191f28;
`;

const BankGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 20px;
`;

const BankButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.toss.blue : 'transparent')};
  border-radius: 12px;
  background-color: #f9fafb;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  color: #191f28;
  text-align: left;
`;
