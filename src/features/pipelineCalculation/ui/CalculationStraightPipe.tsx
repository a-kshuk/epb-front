import { IMaterialProps } from 'entities/pipelineMaterialProps';
import { useStraightPipeList } from 'entities/straightPipe';
import { useAppSelector } from 'shared/hooks';
import CalculationStraightPipeTable from './CalculationStraightPipeTable';
import { IStraightPipeTable } from '../types';
import { memo } from 'react';

const CalculationStraightPipe = () => {
  const pipeList = useStraightPipeList();
  const modeList = useAppSelector((state) => state.pipelineWorkMode.modes);
  const materials = useAppSelector(
    (state) => state.pipelineMaterialProps.props
  );

  const data: IStraightPipeTable[] = modeList.map((mode) => {
    const pipes = pipeList.map((pipe) => {
      return {
        pipe,
        materialProps: materials.find(
          ({ idMaterial, idWorkMode }) =>
            idMaterial === pipe.idMaterial && idWorkMode === mode.id
        ) as IMaterialProps,
      };
    });
    return { mode, pipes };
  });

  return (
    <div className='gap20px'>
      <h4>Прямой участок</h4>
      {data.map(({ mode, pipes }) => (
        <CalculationStraightPipeTable key={mode.id} mode={mode} pipes={pipes} />
      ))}
    </div>
  );
};

export default memo(CalculationStraightPipe);
