import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState } from '../../type/purchase';
import parseStorage from '../../utils/parseStorage';

import H4 from '../Common/Title/H4';
import Chip from '../Common/Chip/Chip';
import BottomSheet from '../Common/BottomSheet';
import Input from '../Common/Input';
import Button from '../Common/Button/Button';
import TextFiled from '../Common/TextFiled/TextFiled';

interface Props {
  select: PurchaseSelectState;
  options: {
    subcategories: string[];
    models: string[];
    storages: string[];
  };
  onSelectCategory: (v: string) => void;
  onSelectSubCategory: (v: string) => void;
  onSelectModel: (v: string) => void;
  onSelectStorage: (v: string) => void;
  onChangeModel: (v: string) => void;
  onClick: () => void;
  isValid: boolean;
}

/** 현재 활성화된(열린) 단계를 결정 */
type ActiveStep = 'category' | 'subcategory' | 'model' | 'storage' | null;

const getActiveStep = (select: PurchaseSelectState): ActiveStep => {
  if (select.category === '기타') return null;
  if (!select.category) return 'category';
  if (!select.subcategory) return 'subcategory';
  if (!select.model) return 'model';
  if (!select.storage) return 'storage';
  return null;
};

/** 카테고리 라벨 매핑 */
const getCategoryLabel = (category: string) => {
  if (category === '갤럭시') return '갤럭시';
  if (category === '아이폰') return '아이폰';
  if (category === '기타') return '기타';
  return category;
};

const StepComponent = (props: Props) => {
  const {
    select,
    options,
    onSelectCategory,
    onSelectSubCategory,
    onSelectModel,
    onSelectStorage,
    onChangeModel,
    onClick,
    isValid,
  } = props;
  const navigate = useNavigate();
  const [openBottom, setOpenBottom] = useState(false);
  const [selected, setSelected] = useState('Samsung');

  const autoActiveStep = getActiveStep(select);
  const [manualOpen, setManualOpen] = useState<ActiveStep>(null);

  const activeStep = manualOpen ?? autoActiveStep;

  const handleSelect = (value: 'Samsung' | 'Apple') => () => {
    setSelected(value);
  };

  /** 접힌 행 클릭 시 해당 단계를 다시 열어줌 */
  const handleCollapsedRowClick = (step: ActiveStep) => {
    setManualOpen(step);
  };

  /** 선택 시 manualOpen 리셋 */
  const handleCategorySelect = (category: string) => {
    setManualOpen(null);
    onSelectCategory(category);
  };

  const handleSubCategorySelect = (subcategory: string) => {
    setManualOpen(null);
    onSelectSubCategory(subcategory);
  };

  const handleModelSelect = (model: string) => {
    setManualOpen(null);
    onSelectModel(model);
  };

  const handleStorageSelect = (storage: string) => {
    setManualOpen(null);
    onSelectStorage(storage);
  };

  const sortedStorages = useMemo(() => {
    if (!options?.storages) return [];
    return [...options.storages].sort((a, b) => parseStorage(a) - parseStorage(b));
  }, [options.storages]);

  /** 기타가 아닌 일반 플로우일 때의 렌더링 */
  const renderNormalFlow = () => {
    if (!select.category || select.category === '기타') return null;

    return (
      <>
        {/* ── 시리즈 ── */}
        {select.subcategory && activeStep !== 'subcategory' ? (
          <CollapsedRow onClick={() => handleCollapsedRowClick('subcategory')}>
            <CollapsedLabel>시리즈</CollapsedLabel>
            <CollapsedRight>
              <CollapsedValue>{select.subcategory}</CollapsedValue>
            </CollapsedRight>
          </CollapsedRow>
        ) : activeStep === 'subcategory' ? (
          <SelectBox>
            <StepHeader>
              <H4>시리즈</H4>
            </StepHeader>
            <ChipGroup>
              {options?.subcategories?.map((subcategory) => (
                <Chip
                  key={subcategory}
                  label={subcategory}
                  selected={select.subcategory === subcategory}
                  onClick={() => handleSubCategorySelect(subcategory)}
                />
              ))}
            </ChipGroup>
          </SelectBox>
        ) : null}

        {select.subcategory && (
          <>
            {select.model && activeStep !== 'model' ? (
              <CollapsedRow onClick={() => handleCollapsedRowClick('model')}>
                <CollapsedLabel>모델명</CollapsedLabel>
                <CollapsedRight>
                  <CollapsedValue>{select.model}</CollapsedValue>
                </CollapsedRight>
              </CollapsedRow>
            ) : activeStep === 'model' ? (
              <SelectBox>
                <StepHeader>
                  <H4>모델명</H4>
                </StepHeader>
                <ChipGroup>
                  {options?.models?.map((model) => (
                    <Chip
                      key={model}
                      label={model}
                      selected={select.model === model}
                      onClick={() => handleModelSelect(model)}
                    />
                  ))}
                </ChipGroup>
              </SelectBox>
            ) : null}
          </>
        )}

        {select.model && (
          <>
            {select.storage && activeStep !== 'storage' ? (
              <CollapsedRow onClick={() => handleCollapsedRowClick('storage')}>
                <CollapsedLabel>용량</CollapsedLabel>
                <CollapsedRight>
                  <CollapsedValue>{select.storage}</CollapsedValue>
                </CollapsedRight>
              </CollapsedRow>
            ) : activeStep === 'storage' ? (
              <SelectBox>
                <StepHeader>
                  <H4>용량</H4>
                </StepHeader>
                <ChipGroup>
                  {sortedStorages.map((storage) => (
                    <Chip
                      key={storage}
                      label={storage}
                      selected={select.storage === storage}
                      onClick={() => handleStorageSelect(storage)}
                    />
                  ))}
                </ChipGroup>
              </SelectBox>
            ) : null}
          </>
        )}
      </>
    );
  };

  return (
    <FirstSection>
      {select.category && activeStep !== 'category' ? (
        <CollapsedRow onClick={() => handleCollapsedRowClick('category')}>
          <CollapsedLabel>브랜드</CollapsedLabel>
          <CollapsedRight>
            <CollapsedValue>{getCategoryLabel(select.category)}</CollapsedValue>
          </CollapsedRight>
        </CollapsedRow>
      ) : (
        <SelectBox>
          <H4>브랜드</H4>
          <ChipGroup>
            {['갤럭시', '아이폰', '기타'].map((category) => (
              <Chip
                key={category}
                label={category}
                selected={select.category === category}
                onClick={() => handleCategorySelect(category)}
              />
            ))}
          </ChipGroup>
        </SelectBox>
      )}

      {/* === 기타가 아닐 때 단계형 선택 === */}
      {renderNormalFlow()}

      {/* === 기타 선택 시 === */}
      {select.category === '기타' && (
        <>
          <InputBox>
            <TitleBox>
              <H4>모델명</H4>
              <SelectSpan>(선택사항)</SelectSpan>
            </TitleBox>
            <Input
              name="customModel"
              value={select.customModel ?? ''}
              placeholder="모델명을 입력해주세요"
              onChange={(e) => onChangeModel(e.target.value)}
            />
          </InputBox>
          <NoticeBase>
            <TextFiled>
              <NoticeBox>
                <img src={'/ico/ico_textfiled.svg'} alt="안내 아이콘" width={24} height={24} />
                비주류 모델의 경우, 견적가가 20,000원 미만으로 책정될 수 있어요
              </NoticeBox>
            </TextFiled>

            <TextFiled>
              <NoticeBox>
                <img src={'/ico/ico_textfiled.svg'} alt="안내 아이콘" width={24} height={24} />
                지금은 스마트폰만 매입하고 있어요 태블릿, 워치 등은 매입하지 않아요
              </NoticeBox>
            </TextFiled>
          </NoticeBase>
        </>
      )}

      <CheckModel onClick={() => setOpenBottom(true)}>모델명 확인하는 방법</CheckModel>

      {/* 여러대 */}
      <BulkSendBtnBox>
        <BulkSendBtn onClick={() => navigate('/multi')}>여러대 한번에 판매하기</BulkSendBtn>
      </BulkSendBtnBox>

      {/* BottomBtn */}
      <BottomButton>
        <Button onClick={onClick} disabled={!isValid}>
          견적보기
        </Button>
      </BottomButton>

      {openBottom && (
        <BottomSheet onClose={() => setOpenBottom(false)}>
          <BottomBox>
            <ModelMenu>
              <ModelItem $selected={selected === 'Samsung'} onClick={handleSelect('Samsung')}>
                Samsung
              </ModelItem>
              <ModelItem $selected={selected === 'Apple'} onClick={handleSelect('Apple')}>
                Apple
              </ModelItem>
            </ModelMenu>

            {selected === 'Samsung' && (
              <SamsungImageBox>
                <img
                  src={'/img/model/samsung.webp'}
                  alt="모델 확인 방법 이미지"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </SamsungImageBox>
            )}

            {selected === 'Apple' && (
              <AppleImageBox>
                <img
                  src={'/img/model/apple.webp'}
                  alt="모델 확인 방법 이미지"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AppleImageBox>
            )}
          </BottomBox>
        </BottomSheet>
      )}
    </FirstSection>
  );
};
export default StepComponent;

const FirstSection = styled.section`
  position: relative;
  min-height: calc(var(--vh, 1vh) * 100 - 90px);

  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 16px 16px 120px;
`;

const CollapsedRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray[200]};
  cursor: pointer;
`;

const CollapsedLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.gray[900]};
`;

const CollapsedRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CollapsedValue = styled.span`
  position: relative;
  padding-right: 24px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.gray[700]};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.gray[400]};
    mask-image: url('/ico/ico_arrow_down.svg');
    mask-size: cover;
    mask-repeat: no-repeat;
    -webkit-mask-image: url('/ico/ico_arrow_down.svg');
    -webkit-mask-size: cover;
    -webkit-mask-repeat: no-repeat;
  }
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
`;

const StepHeader = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-right: 24px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.gray[400]};
    mask-image: url('/ico/ico_arrow_up.svg');
    mask-size: cover;
    mask-repeat: no-repeat;
    -webkit-mask-image: url('/ico/ico_arrow_up.svg');
    -webkit-mask-size: cover;
    -webkit-mask-repeat: no-repeat;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0 180px;
`;

const NoticeBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NoticeBox = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SelectSpan = styled.span`
  color: ${({ theme }) => theme.gray[400]};
`;

const ChipGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  cursor: pointer;
`;

const CheckModel = styled.p`
  position: relative;
  color: ${({ theme }) => theme.gray[700]};
  text-decoration: underline;
  padding-left: 20px;
  padding-top: 16px;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% + 8px);
    transform: translateY(-50%);
    background-image: url('/ico/ico_tip.svg');
    background-size: cover;
    width: 16px;
    height: 16px;
    display: block;
    color: ${({ theme }) => theme.gray[700]};
  }
`;

const BulkSendBtnBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  display: flex;
  justify-content: center;
`;

const BulkSendBtn = styled.button`
  position: relative;
  margin-right: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.primary[700]};

  &::after {
    content: '';
    position: absolute;

    background-image: url('/ico/ico_arrow_right.svg');
    background-size: cover;
    width: 20px;
    height: 20px;
    display: block;

    top: 50%;
    right: -12px;
    transform: translateY(-50%);
  }
`;

const BottomBox = styled.div`
  height: 100%;
`;

const ModelMenu = styled.ul`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-top: 8px;
`;

const ModelItem = styled.li<{ $selected?: boolean }>`
  background-color: ${({ $selected, theme }) => ($selected ? theme.gray[900] : theme.gray[50])};
  width: 31%;
  padding: 14px 4px;
  border-radius: 12px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.gray[900] : theme.gray[200])};
  color: ${({ $selected, theme }) => ($selected ? theme.gray[50] : theme.gray[600])};
  text-align: center;
  font-weight: 500;
  cursor: pointer;
`;

const SamsungImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1080 / 1455;
  margin-top: 24px;

  @media (min-width: 768px) {
    width: 50%;
    margin: 24px auto 0;
  }
`;

const AppleImageBox = styled(SamsungImageBox)`
  aspect-ratio: 1080 / 2937;
`;

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
