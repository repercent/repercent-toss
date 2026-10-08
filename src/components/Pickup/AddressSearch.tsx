import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SAFE_AREA_BOTTOM } from '../../styles/safeArea';

import {
  AddressResult,
  AddressSearchError,
  AddressSearchPage,
  sanitizeKeyword,
  searchAddress,
} from '../../utils/address';

interface AddressSearchProps {
  onSelect: (address: { zipcode: string; address: string }) => void;
  onClose: () => void;
}

const SEARCH_EXAMPLES = [
  { label: '도로명 + 건물번호', example: '송파대로 345' },
  { label: '건물명', example: '롯데월드타워' },
  { label: '동·읍·면 + 지번', example: '신천동 29' },
];

type SearchResult = AddressSearchPage & { query: string };

/** 도로명주소 검색 (iframe 위젯 대신 API를 직접 호출) */
const AddressSearch = ({ onSelect, onClose }: AddressSearchProps) => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const runSearch = async (query: string, page: number) => {
    const id = ++requestId.current;
    setLoading(true);
    setError('');
    try {
      const data = await searchAddress(query, page);
      if (id !== requestId.current) return;
      setResult((prev) =>
        page > 1 && prev
          ? { ...data, query, items: [...prev.items, ...data.items] }
          : { ...data, query }
      );
    } catch (err) {
      if (id !== requestId.current) return;
      setError(
        err instanceof AddressSearchError
          ? err.message
          : '주소를 불러오지 못했어요. 잠시 후 다시 시도해 주세요'
      );
      if (page === 1) setResult(null);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = sanitizeKeyword(keyword);
    if (query.length < 2) {
      setError('검색어를 두 글자 이상 입력해 주세요');
      return;
    }
    inputRef.current?.blur();
    runSearch(query, 1);
  };

  const handleSelect = (item: AddressResult) => {
    onSelect({ zipcode: item.zipNo, address: item.roadAddrPart1 });
  };

  const showGuide = !result && !error && !loading;

  return (
    <SearchBase role="dialog" aria-modal="true" aria-label="주소 검색">
      <Header>
        <Title>주소 검색</Title>
        <CloseButton type="button" aria-label="닫기" onClick={onClose}>
          <img src="/ico/ico_search_delete.svg" alt="" width={24} height={24} />
        </CloseButton>
      </Header>

      <SearchForm role="search" onSubmit={handleSubmit}>
        <SearchBox>
          <img src="/ico/ico_search.svg" alt="" width={24} height={24} />
          <SearchInput
            ref={inputRef}
            id="addressKeyword"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            value={keyword}
            placeholder="도로명, 건물명, 지번으로 검색"
            aria-label="주소 검색어"
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <ClearButton
              type="button"
              aria-label="검색어 지우기"
              onClick={() => {
                setKeyword('');
                inputRef.current?.focus();
              }}
            >
              <img src="/ico/ico_close.svg" alt="" width={20} height={20} />
            </ClearButton>
          )}
        </SearchBox>
      </SearchForm>

      <Body>
        {showGuide && (
          <Guide>
            <GuideTitle>이렇게 검색해 보세요</GuideTitle>
            <GuideList>
              {SEARCH_EXAMPLES.map(({ label, example }) => (
                <li key={label}>
                  <GuideLabel>{label}</GuideLabel>
                  <GuideExample>예) {example}</GuideExample>
                </li>
              ))}
            </GuideList>
          </Guide>
        )}

        {error && <Message role="alert">{error}</Message>}

        {result &&
          (result.items.length === 0 ? (
            <Message>
              검색 결과가 없어요
              {'\n'}도로명·건물명·지번을 다시 확인해 주세요
            </Message>
          ) : (
            <>
              <Count>검색 결과 {result.totalCount.toLocaleString('ko-KR')}건</Count>
              <ResultList>
                {result.items.map((item, index) => (
                  <li key={`${item.bdMgtSn}-${index}`}>
                    <ResultButton type="button" onClick={() => handleSelect(item)}>
                      <ZipCode>{item.zipNo}</ZipCode>
                      <RoadAddr>
                        {item.roadAddrPart1}
                        {item.roadAddrPart2 && <small> {item.roadAddrPart2}</small>}
                      </RoadAddr>
                      <JibunAddr>
                        <span>지번</span>
                        {item.jibunAddr}
                      </JibunAddr>
                    </ResultButton>
                  </li>
                ))}
              </ResultList>
              {result.hasMore && (
                <MoreButton
                  type="button"
                  disabled={loading}
                  onClick={() => runSearch(result.query, result.page + 1)}
                >
                  더 보기
                </MoreButton>
              )}
            </>
          ))}

        {loading && <Loading aria-live="polite">검색 중이에요</Loading>}
      </Body>
    </SearchBase>
  );
};

export default AddressSearch;

const SearchBase = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  width: 100%;
  max-width: 720px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(16px + env(safe-area-inset-top)) 16px 8px 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #191f28;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchForm = styled.form`
  padding: 8px 20px 12px;
`;

const SearchBox = styled.div`
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 0 16px;
  border: 1px solid rgba(0, 27, 55, 0.1);
  border-radius: 14px;
  background-color: #f9fafb;

  &:focus-within {
    border-color: ${({ theme }) => theme.toss.blue};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 46px;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  color: #191f28;

  &::placeholder {
    color: rgba(3, 24, 50, 0.46);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const ClearButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0 calc(24px + ${SAFE_AREA_BOTTOM});
  -webkit-overflow-scrolling: touch;
`;

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px;
`;

const GuideTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #333d4b;
`;

const GuideList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & li {
    display: flex;
    flex-direction: column;
  }
`;

const GuideLabel = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: #4e5968;
`;

const GuideExample = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.toss.blue};
`;

const Message = styled.p`
  padding: 48px 24px;
  font-size: 15px;
  line-height: 23px;
  color: #6b7684;
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
`;

const Count = styled.p`
  padding: 4px 24px 8px;
  font-size: 13px;
  line-height: 18px;
  color: #8b95a1;
`;

const ResultList = styled.ul`
  & li + li {
    border-top: 1px solid #f2f4f6;
  }
`;

const ResultButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 14px 24px;
  text-align: left;

  &:active {
    background-color: #f9fafb;
  }
`;

const ZipCode = styled.span`
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  color: ${({ theme }) => theme.toss.blue};
`;

const RoadAddr = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #191f28;
  word-break: keep-all;

  & small {
    font-size: 14px;
    color: #6b7684;
  }
`;

const JibunAddr = styled.span`
  display: flex;
  gap: 6px;
  font-size: 13px;
  line-height: 19px;
  color: #8b95a1;
  word-break: keep-all;

  & span {
    flex-shrink: 0;
    padding: 0 4px;
    border-radius: 4px;
    background-color: #f2f4f6;
    font-size: 11px;
    color: #6b7684;
  }
`;

const MoreButton = styled.button`
  display: block;
  margin: 12px auto 0;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #f2f4f6;
  font-size: 14px;
  font-weight: 600;
  color: #4e5968;

  &:disabled {
    opacity: 0.5;
  }
`;

const Loading = styled.p`
  padding: 24px;
  font-size: 14px;
  color: #8b95a1;
  text-align: center;
`;
