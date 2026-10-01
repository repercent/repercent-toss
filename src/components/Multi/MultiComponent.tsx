import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import H2 from '../Common/Title/H2';
import Button from '../Common/Button/Button';

const PurchaseMultiComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/pickup', {
      state: {
        category: '여러대',
        subcategory: '',
        model: '',
        storage: '',
      },
    });
  };

  return (
    <PurchaseMultiBase>
      <MultiTitle>
        <H2>여러대 판매 신청하기</H2>
        <MultiDes>
          여러 번 신청 없이 한 번에 보내세요.
          <br />
          기종을 몰라도, 전원이 안 켜져도
          <br />
          리퍼센트가 모두 검수해드립니다.
        </MultiDes>
      </MultiTitle>

      <MultiImg src={'/img/purchase/multi.png'} alt="핸드폰 이미지" />

      <MultiMenu>
        <MultiItem>
          <img src={`/ico/rank/ico_black_1.svg`} alt="순서 아이콘 1" width={20} height={20} />
          여러대 한번에 판매하기 선택
        </MultiItem>
        <MultiItem>
          <img src={`/ico/rank/ico_black_2.svg`} alt="순서 아이콘 2" width={20} height={20} />
          발송 방법 선택 후, 기기를 한 박스에 담아 발송하면 끝!
        </MultiItem>
      </MultiMenu>
      <Button onClick={handleSubmit}>여러대 한번에 판매하기</Button>
    </PurchaseMultiBase>
  );
};
export default PurchaseMultiComponent;

const PurchaseMultiBase = styled.div`
  position: relative;
  height: calc(var(--vh, 1vh) * 100);

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding: 16px;
`;

const MultiTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MultiDes = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.gray[400]};
`;

const MultiImg = styled.img`
  display: block;
`;

const MultiMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MultiItem = styled.li`
  background-color: ${({ theme }) => theme.gray[50]};

  display: flex;
  padding: 16px;
  gap: 12px;
  border-radius: 12px;

  font-size: 16px;
  font-weight: 700;
`;
