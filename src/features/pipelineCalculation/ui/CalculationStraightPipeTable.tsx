import React, { memo } from 'react';
import { Table } from 'shared/ui';
import { calculationThicknessStraightPipe } from '../lib';
import { IStraightPipeTable } from '../types';
// import BendPipeModal from './BendPipeModal';

const HEADER_TABLE = {
  position: '№ Участка',
  pressure: 'Давление',
  externalDiameter: 'Внешний диаметр (мм)',
  permissibleStresses: 'Допускаемое напряжение',
  thickness: 'Расчетная толщина (мм)',
};

const StraightPipeTable: React.FC<IStraightPipeTable> = ({ mode, pipes }) => {
  const rows = pipes.map(({ pipe, materialProps }) => ({
    position: pipe.position,
    pressure: mode.pressure,
    externalDiameter: pipe.externalDiameter,
    permissibleStresses: materialProps?.permissibleStresses || 0,
    thickness: calculationThicknessStraightPipe({
      pressure: mode.pressure,
      externalDiameter: pipe.externalDiameter || 0,
      weldCoefficient: 1,
      permissibleStresses: materialProps?.permissibleStresses || 0,
    }),
  }));

  return (
    <div className='gap5px'>
      <h5>{mode.title}</h5>
      <Table titles={HEADER_TABLE} rows={rows} />
    </div>
  );
};

export default memo(StraightPipeTable);
