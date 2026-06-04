import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { PurchaseGrade, PurchaseSelectState } from '../type/purchase';
import GradeComponent from '../components/Grade/GradeComponent';

const GradeContainer = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: PurchaseSelectState };

  const [gradeDetail, setGradeDetail] = useState<PurchaseGrade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state?.category || !state?.subcategory || !state?.model || !state?.storage) {
      navigate('/step');
      return;
    }

    const fetchGradeDetail = async () => {
      try {
        const res = await axios.get(`/api/grades/product/detail`, {
          params: {
            category: state.category,
            subcategory: state.subcategory,
            model: state.model,
            storage: state.storage,
          },
        });
        setGradeDetail(res.data);
      } catch (err) {
        navigate('/err');
      } finally {
        setLoading(false);
      }
    };

    fetchGradeDetail();
  }, []);

  const { minPrice, maxPrice } = useMemo(() => {
    if (!gradeDetail || gradeDetail.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }
    const prices = gradeDetail.map((item) => item.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [gradeDetail]);

  if (loading || gradeDetail.length === 0) return null;

  return (
    <GradeComponent
      minPrice={minPrice}
      maxPrice={maxPrice}
      gradeDetail={gradeDetail}
      gradeImage={gradeDetail[0].image}
      purchase={state}
      onClick={() => {
        navigate('/pickup', {
          state: {
            ...state,
          },
        });
      }}
    />
  );
};
export default GradeContainer;
