import DaumPostcodeEmbed from 'react-daum-postcode';
import styled from 'styled-components';

interface DaumPostProps {
  onClose: () => void;
  onComplete: (data: { zonecode: string; address: string }) => void;
}

const DaumPost = ({ onClose, onComplete }: DaumPostProps) => {
  const handleComplete = (data: { zonecode: string; address: string }) => {
    onComplete({
      zonecode: data.zonecode,
      address: data.address,
    });
    onClose();
  };

  return (
    <ModalBase>
      <ModalInner>
        <PostBox>
          <DaumPostcodeEmbed
            style={{ height: '75vh', maxHeight: '600px' }}
            onComplete={handleComplete}
          />
        </PostBox>
      </ModalInner>
    </ModalBase>
  );
};

export default DaumPost;

const ModalBase = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
`;

const ModalInner = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 280px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostBox = styled.div`
  background-color: #fff;
  width: 100%;
  padding-top: 16px;
  border-radius: 5px;
`;
