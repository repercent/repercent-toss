import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PurchaseSelectState } from '../type/purchase';
import { Category, ETC, ETC_MODELS, ETC_SERIES } from '../constant/purchase';
import { purchaseApi } from '../utils/api';
import { getEtcType, orderSeries, withEtcOption } from '../utils/purchaseEtc';

import StepComponent from '../components/Step/StepComponent';

const StepContainer = () => {
  const navigate = useNavigate();

  const [select, setSelect] = useState<PurchaseSelectState>({});

  const [options, setOptions] = useState<{
    subcategories: string[];
    models: string[];
    storages: string[];
  }>({
    subcategories: [],
    models: [],
    storages: [],
  });

  /**
   * 옵션 목록 정규화.
   * 운영 API는 ['A,B,C'] 한 문자열, 개발 API는 ['A', 'B', 'C']로 내려와서 둘 다 처리한다.
   */
  const toOptions = (values?: string[]) =>
    (values ?? [])
      .flatMap((value) => value.split(','))
      .map((value) => value.trim())
      .filter(Boolean);

  const fetchData = async (params: Record<string, string>) => {
    const res = await purchaseApi.get(`/grades/products`, { params });
    return res.data?.[0];
  };

  /** 브랜드 선택. 위 단계를 바꾸면 아래 단계와 기타 모델명은 더 이상 맞는 값이 아니라 함께 지운다. */
  const onSelectCategory = async (category: Category) => {
    setSelect({ category });
    setOptions({ subcategories: [], models: [], storages: [] });

    if (category === ETC) return;

    const data = await fetchData({ category });
    setOptions({
      subcategories: withEtcOption(
        orderSeries(toOptions(data?.subcategory), category),
        ETC_SERIES[category]
      ),
      models: [],
      storages: [],
    });
  };

  /** 시리즈 선택 */
  const onSelectSubCategory = async (subcategory: string) => {
    setSelect((prev) => ({
      ...prev,
      subcategory,
      model: undefined,
      storage: undefined,
      customModel: undefined,
    }));
    setOptions((prev) => ({ ...prev, models: [], storages: [] }));

    // 기타 칩은 서버 목록에 없는 값이라 그 아래 목록을 묻지 않는다.
    if (subcategory === ETC_SERIES[select.category as Category]) return;

    const data = await fetchData({ category: select.category!, subcategory });
    setOptions((prev) => ({
      ...prev,
      models: withEtcOption(toOptions(data?.model), ETC_MODELS[subcategory]),
      storages: [],
    }));
  };

  /** 모델 선택 */
  const onSelectModel = async (model: string) => {
    setSelect((prev) => ({ ...prev, model, storage: undefined, customModel: undefined }));
    setOptions((prev) => ({ ...prev, storages: [] }));

    if (model === ETC_MODELS[select.subcategory!]) return;

    const data = await fetchData({
      category: select.category!,
      subcategory: select.subcategory!,
      model,
    });
    setOptions((prev) => ({
      ...prev,
      storages: toOptions(data?.storage),
    }));
  };

  /** 용량 선택 */
  const onSelectStorage = (storage: string) => {
    setSelect((prev) => ({ ...prev, storage }));
  };

  /** 기타 모델 작성 */
  const onChangeModel = (value: string) => {
    setSelect((prev) => ({ ...prev, customModel: value }));
  };

  const etcType = getEtcType(select);

  // 기타는 모델명을 적지 않아도 바로 신청할 수 있다.
  const isValid = etcType
    ? true
    : !!select.category && !!select.subcategory && !!select.model && !!select.storage;

  const handleSubmit = async () => {
    if (!select.category) return;

    // 기타인 경우. 예상시세 없이 수거 단계로 가고, 위에서 고른 브랜드·시리즈는 그대로 보낸다.
    // 모델 기타 칩 값은 시리즈와 1:1이라 보내지 않고 모델명 칸에 적은 값을 보낸다(브랜드 기타와 같다).
    if (etcType) {
      navigate('/pickup', {
        state: {
          category: select.category,
          customModel: '',
          subcategory: etcType === 'brand' ? '' : (select.subcategory ?? ''),
          model: select.customModel ?? '',
          storage: '',
          etc: true,
        },
      });
      return;
    }

    const { category, subcategory, model, storage } = select;
    if (!category || !subcategory || !model || !storage) return;

    navigate('/grade', {
      state: { category, subcategory, model, storage },
    });
  };

  return (
    <StepComponent
      select={select}
      options={options}
      onClick={handleSubmit}
      isValid={isValid}
      etcType={etcType}
      onSelectCategory={onSelectCategory}
      onSelectSubCategory={onSelectSubCategory}
      onSelectModel={onSelectModel}
      onSelectStorage={onSelectStorage}
      onChangeModel={onChangeModel}
    />
  );
};

export default StepContainer;
