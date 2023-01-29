import React, { memo } from 'react';
import { PipelineElementTable } from 'entities/PipelineElement';
import { StraightPipeTable } from 'entities/straightPipe';

const Thickness: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <PipelineElementTable />
      <StraightPipeTable />
    </div>
  );
};

export default memo(Thickness);
