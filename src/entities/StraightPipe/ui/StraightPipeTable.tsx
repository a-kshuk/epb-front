import React, { memo, useMemo, useState } from 'react';
import { useAppSelector } from 'shared/hooks';
import { ButtonIcon, Table } from 'shared/ui';
import { IPipePosition, useStraightPipeList } from '../model/straightPipeModel';

import StraightPipeModal from './StraightPipeModal';

const HEADER_TABLE = {
  position: '№ элемента',
  diameter: 'Диаметр',
  material: 'Материал',
  edit: '',
};

const StraightPipeTable: React.FC = () => {
  const [straightPipe, setStraightPipe] = useState<IPipePosition | undefined>();
  const pipes = useStraightPipeList();

  const materials = useAppSelector(
    (state) => state.pipelineMainOptions.materials
  );

  const rows = useMemo(() => {
    if (!materials.length) {
      return [];
    }
    const idMaterial = materials[0].id;
    return pipes.map((pipe) => ({
      idElement: pipe.idElement,
      position: pipe.position,
      diameter: pipe.diameter || 0,
      material:
        materials.find(({ id }) => (pipe?.idMaterial || idMaterial) === id)
          ?.title || '',
      edit: (
        <ButtonIcon
          color='red'
          imgScr='/images/edit-2.svg'
          onClick={() => setStraightPipe(pipe)}
        />
      ),
    }));
  }, [pipes, materials]);

  if (!materials.length) {
    return <div>Нужно добавить материал</div>;
  }

  if (!rows.length) {
    return null;
  }

  return (
    <div className='gap5px'>
      Прямой участок
      <Table titles={HEADER_TABLE} rows={rows} />
      <StraightPipeModal
        pipe={straightPipe}
        onClose={() => setStraightPipe(undefined)}
      />
    </div>
  );
};

export default memo(StraightPipeTable);
