import React, { memo } from 'react';
import { PipelineElementTable } from 'entities/pipelineElement';
import { StraightPipeTable } from 'entities/straightPipe';

const Thickness: React.FC = () => {
  return (
    <div className='gap20px'>
      <PipelineElementTable />
      <StraightPipeTable />
    </div>
  );
};

export default memo(Thickness);
