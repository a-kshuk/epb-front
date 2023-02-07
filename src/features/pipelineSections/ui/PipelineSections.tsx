import React, { memo } from 'react';
import { PipelineElementTable } from 'entities/pipelineElement';
import { StraightPipeTable } from 'entities/straightPipe';
import { BendPipeTable } from 'entities/bendPipe';

const Thickness: React.FC = () => {
  return (
    <div className='gap20px'>
      <PipelineElementTable />
      <StraightPipeTable />
      <BendPipeTable />
    </div>
  );
};

export default memo(Thickness);
