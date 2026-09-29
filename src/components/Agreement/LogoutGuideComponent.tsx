import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

type GuideTab = 'galaxy' | 'apple';

const TABS: { key: GuideTab; label: string }[] = [
  { key: 'galaxy', label: '갤럭시' },
  { key: 'apple', label: '애플' },
];

const GUIDES: Record<GuideTab, { title: string; images: number[] }[]> = {
  galaxy: [
    { title: '1. 설정 화면', images: [1] },
    { title: '2. 계정 및 백업', images: [2] },
    { title: '3. 계정 관리', images: [3] },
    { title: '4. 계정 선택', images: [4] },
    { title: '5. 해당 계정 삭제 선택', images: [5, 6] },
    { title: '6. 기기 전체 초기화', images: [7] },
  ],
  apple: [
    { title: '1. 설정 화면', images: [1] },
    { title: '2. 내 정보 선택', images: [2] },
    { title: '3. 하단 로그아웃 선택', images: [3] },
    { title: '4. 설정에서 [일반] 메뉴 선택', images: [4] },
    { title: '5. 전송 또는 iPhone 재설정 선택', images: [5] },
    { title: '6. iPhone 지우기 선택', images: [6, 7] },
  ],
};

const LogoutGuideComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: GuideTab = searchParams.get('tab') === 'apple' ? 'apple' : 'galaxy';

  const handleTab = (next: GuideTab) => {
    setSearchParams({ tab: next }, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <GuideBase>
      <Tabs role="tablist">
        {TABS.map(({ key, label }) => (
          <TabItem
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            $active={tab === key}
            onClick={() => handleTab(key)}
          >
            {label}
          </TabItem>
        ))}
      </Tabs>

      <Steps>
        {GUIDES[tab].map(({ title, images }) => (
          <Step key={title}>
            <StepTitle>{title}</StepTitle>
            {images.map((image) => (
              <StepImage
                key={image}
                src={`/img/logout/${tab}_${image}.jpg`}
                alt={title}
                loading="lazy"
              />
            ))}
          </Step>
        ))}
      </Steps>
    </GuideBase>
  );
};

export default LogoutGuideComponent;

const GuideBase = styled.div`
  padding-bottom: 40px;
`;

const Tabs = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  padding: 0 20px 0 19px;
  border-bottom: 1px solid rgba(0, 27, 55, 0.1);
  background-color: #fff;
`;

const TabItem = styled.button<{ $active: boolean }>`
  position: relative;
  flex: 1;
  padding: 12px 8px 13px;
  font-size: 17px;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  line-height: 26px;
  color: ${({ $active }) => ($active ? 'rgba(0, 12, 30, 0.8)' : 'rgba(0, 19, 43, 0.58)')};

  &::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: -1px;
    height: 2px;
    border-radius: 10px;
    background-color: ${({ $active }) => ($active ? '#333d4b' : 'transparent')};
  }
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 16px 0;
`;

const Step = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #384152;
`;

const StepImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 343 / 363;
  object-fit: cover;
`;
