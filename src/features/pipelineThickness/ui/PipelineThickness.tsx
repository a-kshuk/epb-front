import React, { useMemo } from 'react';
import { useAppSelector } from 'shared/hooks';
import { PipelineThicknessTable } from 'entities/pipelineThickness';

const PipelineThickness = () => {
  const elements = useAppSelector((state) => state.pipelineElements.elements);
  const list = useMemo(
    () => [...elements].sort((a, b) => a.position - b.position),
    [elements]
  );
  return (
    <div className={'gap20px'}>
      {list.map((el) => (
        <PipelineThicknessTable key={el.id} pipeLineElement={el} />
      ))}
    </div>
  );
};

export default PipelineThickness;
