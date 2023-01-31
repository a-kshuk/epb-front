import React, { memo } from 'react';
import { WorkModeTable } from 'entities/pipelineWorkMode';
import { MainInfo } from 'entities/pipelineMainInfo';
import { MaterialTable } from 'entities/pipelineMaterial';
import { MaterialPropsTable } from 'entities/pipelineMaterialProps';

const PipelineMainOptions: React.FC = () => {
  return (
    <div className={'gap20px'}>
      <MainInfo />
      <WorkModeTable />
      <MaterialTable />
      <MaterialPropsTable />
    </div>
  );
};

export default memo(PipelineMainOptions);
