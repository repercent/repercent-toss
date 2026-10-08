import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PurchaseSelectState } from '../../type/purchase';
import { CATEGORIES, Category, EtcType } from '../../constant/purchase';
import parseStorage from '../../utils/parseStorage';

import H4 from '../Common/Title/H4';
import Chip from '../Common/Chip/Chip';
import BottomSheet from '../Common/BottomSheet';
import Input from '../Common/Input';
import BottomCTA from '../Common/BottomCTA';
import CTAButton from '../Common/Button/CTAButton';
import { bottomCtaSpace } from '../Common/bottomCtaSpace';
import TextFiled from '../Common/TextFiled/TextFiled';

interface Props {
  select: PurchaseSelectState;
  options: {
    subcategories: string[];
    models: string[];
    storages: string[];
  };
  onSelectCategory: (v: Category) => void;
  onSelectSubCategory: (v: string) => void;
  onSelectModel: (v: string) => void;
  onSelectStorage: (v: string) => void;
  onChangeModel: (v: string) => void;
  onClick: () => void;
  isValid: boolean;
  /** 고른 기타의 단계. 기타를 고르면 용량 대신 모델명 입력칸이 나온다. */
  etcType: EtcType | null;
}

/** 현재 활성화된(열린) 단계를 결정 */
type ActiveStep = 'category' | 'subcategory' | 'model' | 'storage' | null;

const getActiveStep = (select: PurchaseSelectState, etcType: EtcType | null): ActiveStep => {
  // 기타를 고르면 그 아래는 모델명 입력칸 하나라 더 열 단계가 없다.
  if (etcType) return null;
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
    etcType,
  } = props;
  const navigate = useNavigate();
  const [openBottom, setOpenBottom] = useState(false);
  const [selected, setSelected] = useState('Samsung');

  const autoActiveStep = getActiveStep(select, etcType);
  const [manualOpen, setManualOpen] = useState<ActiveStep>(null);

  const activeStep = manualOpen ?? autoActiveStep;

  /** 모델 기타를 고른 뒤 모델 목록을 다시 펼친 상태. 입력칸을 숨기고 견적보기를 막는다. */
  const isEtcModelListOpen = etcType === 'model' && activeStep === 'model';

  const handleSelect = (value: 'Samsung' | 'Apple') => () => {
    setSelected(value);
  };

  /** 접힌 행 클릭 시 해당 단계를 다시 열어줌 */
  const handleCollapsedRowClick = (step: ActiveStep) => {
    setManualOpen(step);
  };

  /** 다시 펼친 행의 제목을 누르면 고른 값 그대로 접는다. */
  const handleOpenRowClick = (step: ActiveStep) => {
    if (manualOpen === step) setManualOpen(null);
  };

  /**
   * 선택 시 manualOpen 리셋. 이미 고른 값을 다시 누르면 행만 접고 아래 단계와
   * 기타 모델명 입력값은 그대로 둔다.
   */
  const handleCategorySelect = (category: Category) => {
    setManualOpen(null);
    if (category === select.category) return;
    onSelectCategory(category);
  };

  const handleSubCategorySelect = (subcategory: string) => {
    setManualOpen(null);
    if (subcategory === select.subcategory) return;
    onSelectSubCategory(subcategory);
  };

  const handleModelSelect = (model: string) => {
    setManualOpen(null);
    if (model === select.model) return;
    onSelectModel(model);
  };

  const handleStorageSelect = (storage: string) => {
    setManualOpen(null);
    if (storage === select.storage) return;
    onSelectStorage(storage);
  };

  const sortedStorages = useMemo(() => {
    if (!options?.storages) return [];
    return [...options.storages].sort((a, b) => parseStorage(a) - parseStorage(b));
  }, [options.storages]);

  /** 브랜드 기타가 아닐 때의 시리즈·모델명·용량 행 */
  const renderNormalFlow = () => {
    if (!select.category || etcType === 'brand') return null;

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
            <StepHeader
              $clickable={manualOpen === 'subcategory'}
              onClick={() => handleOpenRowClick('subcategory')}
            >
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

        {/* 시리즈 기타는 모델 목록 없이 아래 모델명 입력칸으로 바로 간다. */}
        {select.subcategory && etcType !== 'series' && (
          <>
            {/* 모델 기타는 접혀 있을 때 아래 모델명 입력칸 제목에 고른 값을 함께 보여 준다. */}
            {select.model && activeStep !== 'model' && etcType !== 'model' ? (
              <CollapsedRow onClick={() => handleCollapsedRowClick('model')}>
                <CollapsedLabel>모델명</CollapsedLabel>
                <CollapsedRight>
                  <CollapsedValue>{select.model}</CollapsedValue>
                </CollapsedRight>
              </CollapsedRow>
            ) : activeStep === 'model' ? (
              <SelectBox>
                <StepHeader
                  $clickable={manualOpen === 'model'}
                  onClick={() => handleOpenRowClick('model')}
                >
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

        {select.model && !etcType && (
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
                <StepHeader
                  $clickable={manualOpen === 'storage'}
                  onClick={() => handleOpenRowClick('storage')}
                >
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
            {CATEGORIES.map((category) => (
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

      {/* === 브랜드 기타가 아닐 때 단계형 선택 === */}
      {renderNormalFlow()}

      {/* === 기타 선택 시. 브랜드·시리즈·모델 기타 모두 같은 입력칸과 안내 === */}
      {etcType && (
        <>
          {!isEtcModelListOpen && (
            <InputBox>
              <InputHeader
                $clickable={etcType === 'model'}
                onClick={etcType === 'model' ? () => handleCollapsedRowClick('model') : undefined}
              >
                <TitleBox>
                  <H4>모델명</H4>
                  <SelectSpan>(선택사항)</SelectSpan>
                </TitleBox>
                {etcType === 'model' && <CollapsedValue>{select.model}</CollapsedValue>}
              </InputHeader>
              <Input
                name="customModel"
                value={select.customModel ?? ''}
                placeholder="모델명을 입력해주세요"
                onChange={(e) => onChangeModel(e.target.value)}
              />
            </InputBox>
          )}
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

      <BottomCTA
        upper={
          <BulkSendBtn type="button" onClick={() => navigate('/multi')}>
            여러대 한 번에 판매하기
            <img src="/ico/ico_arrow_right_m.svg" alt="" width={24} height={24} />
          </BulkSendBtn>
        }
      >
        <CTAButton onClick={onClick} disabled={!isValid || isEtcModelListOpen}>
          견적 보기
        </CTAButton>
      </BottomCTA>

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
  padding: 16px 16px ${bottomCtaSpace(50)};
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

const StepHeader = styled.div<{ $clickable?: boolean }>`
  position: relative;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

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

const InputHeader = styled.div<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
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

/** 하단 CTA 위 텍스트 버튼 (TDS 텍스트 버튼 17 Medium) */
const BulkSendBtn = styled.button`
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 19, 43, 0.58);
`;
