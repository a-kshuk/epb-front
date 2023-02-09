import { memo } from 'react';
import { CalculationBendPipe } from 'features/calculationBendPipe';
import CalculationStraightPipe from './CalculationStraightPipe';

const CalculationPipeline = () => {
  return (
    <div>
      <CalculationStraightPipe />
      <CalculationBendPipe />
    </div>
  );
};

export default memo(CalculationPipeline);
