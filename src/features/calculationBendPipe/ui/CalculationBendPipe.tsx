import React, { memo } from 'react';
import { useBendPipeList } from 'entities/bendPipe';
import { useAppSelector } from 'shared/hooks';
import CalculationBendPipeTable from './CalculationBendPipeTable';
import { IBendPipeTable } from '../types';

const CalculationBendPipe: React.FC = () => {
  const pipeList = useBendPipeList();
  const modeList = useAppSelector((state) => state.pipelineWorkMode.modes);
  const materials = useAppSelector((state) => state.pipelineMaterial.materials);
  const materialProps = useAppSelector(
    (state) => state.pipelineMaterialProps.props
  );

  const data: IBendPipeTable[] = modeList.map((mode) => {
    const pipes = pipeList.map((pipe) => {
      return {
        pipe,
        materialProps: pipe.idMaterial
          ? materialProps.find(
              ({ idMaterial, idWorkMode }) =>
                idMaterial === pipe.idMaterial && idWorkMode === mode.id
            )
          : undefined,
        material: pipe.idMaterial
          ? materials.find(({ id }) => pipe.idMaterial === id)
          : undefined,
      };
    });
    return { mode, pipes };
  });

  return (
    <div className='gap20px'>
      <h4>Отвод</h4>
      {data.map(({ mode, pipes }) => (
        <CalculationBendPipeTable key={mode.id} mode={mode} pipes={pipes} />
      ))}
    </div>
  );
};

export default memo(CalculationBendPipe);
