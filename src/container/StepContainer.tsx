import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PurchaseSelectState } from '../type/purchase';
import { purchaseApi } from '../utils/api';

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

  /** 브랜드 선택 */
  const onSelectCategory = async (category: string) => {
    if (category === '기타') {
      setSelect({ category });
      return;
    }

    setSelect({ category });

    const data = await fetchData({ category });
    setOptions({
      subcategories: toOptions(data?.subcategory),
      models: [],
      storages: [],
    });
  };

  /** 시리즈 선택 */
  const onSelectSubCategory = async (subcategory: string) => {
    setSelect((prev) => ({ ...prev, subcategory, model: undefined, storage: undefined }));

    const data = await fetchData({ category: select.category!, subcategory });
    setOptions((prev) => ({
      ...prev,
      models: toOptions(data?.model),
      storages: [],
    }));
  };

  /** 모델 선택 */
  const onSelectModel = async (model: string) => {
    setSelect((prev) => ({ ...prev, model, storage: undefined }));

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

  const isValid =
    select.category === '기타'
      ? true
      : !!select.category && !!select.subcategory && !!select.model && !!select.storage;

  const handleSubmit = async () => {
    if (!select.category) return;

    if (select.category === '기타') {
      navigate('/pickup', {
        state: {
          category: '기타',
          customModel: select.customModel ?? '',
          subcategory: '',
          model: select.customModel ?? '',
          storage: '',
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
      onSelectCategory={onSelectCategory}
      onSelectSubCategory={onSelectSubCategory}
      onSelectModel={onSelectModel}
      onSelectStorage={onSelectStorage}
      onChangeModel={onChangeModel}
    />
  );
};

export default StepContainer;
