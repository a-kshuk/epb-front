import React, { memo } from 'react';
import PipelineElement from './PipelineElement/PipelineElements';
import ThicknessPoint from './ThicknessPoint/ThicknessPoint';

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
      <PipelineElement />
      {/* <ThicknessPoint /> */}
      {/* <Table titles={THICKNESS_TITLES} rows={MOCK}></Table> */}
    </div>
  );
};

export default memo(Thickness);
