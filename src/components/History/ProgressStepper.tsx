import styled, { css } from 'styled-components';

import { PROGRESS_STEPS } from '../../constant/purchase';

interface ProgressStepperProps {
  step: number;
  completed?: boolean;
}

/** 라벨 너비: 라벨 중심 = 점 위치 */
const LABEL_WIDTH = 56;
const LAST_STEP = PROGRESS_STEPS.length - 1;

const pointAt = (index: number) =>
  `calc(${LABEL_WIDTH / 2}px + ${index} * (100% - ${LABEL_WIDTH}px) / ${LAST_STEP})`;

const ProgressStepper = ({ step, completed = false }: ProgressStepperProps) => {
  const fillWidth = completed || step >= LAST_STEP ? '100%' : pointAt(step);

  return (
    <StepperBase aria-label={`진행 단계: ${PROGRESS_STEPS[step]}`}>
      <Track>
        <Fill style={{ width: fillWidth }} />
        {PROGRESS_STEPS.map((label, index) => (
          <Dot
            key={label}
            style={{ left: pointAt(index) }}
            $current={!completed && index === step}
          />
        ))}
      </Track>
      <Labels>
        {PROGRESS_STEPS.map((label, index) => (
          <Label key={label} $current={!completed && index === step}>
            {label}
          </Label>
        ))}
      </Labels>
    </StepperBase>
  );
};

export default ProgressStepper;

const StepperBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 24px 8px;
`;

const Track = styled.div`
  position: relative;
  height: 8px;
  border: 1px solid rgba(2, 32, 71, 0.05);
  border-radius: 40px;
  background-color: #f2f4f6;
`;

const Fill = styled.div`
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  border-radius: 40px;
  background: linear-gradient(90deg, rgba(49, 130, 246, 0.24) 0%, rgba(49, 130, 246, 0.29) 100%);
`;

const Dot = styled.span<{ $current: boolean }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;

  ${({ $current }) =>
    $current
      ? css`
          width: 8px;
          height: 8px;
          background-color: ${({ theme }) => theme.toss.blue};
          box-shadow: 0 0 0 4px rgba(26, 122, 249, 0.14);
        `
      : css`
          width: 5px;
          height: 5px;
          background-color: #fff;
          box-shadow: 0 0 0 1px rgba(2, 32, 71, 0.05);
        `}
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span<{ $current: boolean }>`
  width: ${LABEL_WIDTH}px;
  font-size: 13px;
  font-weight: ${({ $current }) => ($current ? 700 : 600)};
  line-height: 19.5px;
  color: ${({ $current }) => ($current ? 'rgba(0, 12, 30, 0.8)' : 'rgba(0, 19, 43, 0.58)')};
  text-align: center;
  word-break: keep-all;
`;
