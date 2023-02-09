import React, { memo } from 'react';
import { Table } from 'shared/ui';
import { calculationThicknessBendPipe } from '../lib';
import { IBendPipeTable } from '../types';
// import BendPipeModal from './BendPipeModal';

const HEADER_TABLE = {
  position: '№ Участка',
  pressure: 'Давление',
  externalDiameter: 'Внешний диаметр (мм)',
  permissibleStresses: 'Допускаемое напряжение',
  thickness: 'Расчетная толщина (мм)',
};

const StraightPipeTable: React.FC<IBendPipeTable> = ({ mode, pipes }) => {
  const rows = pipes.map(({ pipe, materialProps, material }) => {
    const calculation = calculationThicknessBendPipe({
      pressure: mode.pressure,
      temperature: mode.temperature,
      externalDiameter: pipe.externalDiameter || 0,
      radiusBend: pipe.radius || 0,
      ovality: 0.03,
      weldCoefficient: 1,
      permissibleStresses: materialProps?.permissibleStresses || 0,
      steelType: material?.steelType,
    });
    return {
      position: pipe.position,
      pressure: mode.pressure,
      externalDiameter: pipe.externalDiameter,
      permissibleStresses: materialProps?.permissibleStresses || 0,
      thickness: calculation.estimatedThickness,
    };
  });

  return (
    <div className='gap5px'>
      <h5>{mode.title}</h5>
      <Table titles={HEADER_TABLE} rows={rows} />
    </div>
  );
};

export default memo(StraightPipeTable);
