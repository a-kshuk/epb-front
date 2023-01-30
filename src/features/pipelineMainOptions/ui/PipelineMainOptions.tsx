import React, { memo } from 'react';
import { WorkModeTable } from 'entities/pipelineWorkMode';
import { MainInfo } from 'entities/pipelineMainInfo';

const PipelineMainOptions: React.FC = () => {
  return (
    <div className={'gap20px'}>
      <MainInfo />
      <WorkModeTable />
    </div>
  );
};

export default memo(PipelineMainOptions);
