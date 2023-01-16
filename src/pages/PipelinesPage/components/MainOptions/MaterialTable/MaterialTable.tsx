import React, { memo, useMemo } from 'react';
import { Button, Input, InputTag, Table } from '@/kits';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MaterialModal from '../MaterialModal/MaterialModal';
import { IMaterialMechanicalProps } from '../../../redux';

import styles from '../MainOptions.modules.scss';

interface IMaterialTable extends Omit<IMaterialMechanicalProps, 'idWorkMode'> {
  title: string;
  mode: string;
}

const MATERIAL_TITLES: Record<keyof IMaterialTable, string> = {
  title: 'Название материала',
  mode: 'Режим',
  permissibleStresses: 'Номинальное допускаемое напряжение',
  ovality: 'Овальность',
  elasticModulus: 'Модуль упругости',
};

const MaterialTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { materials, workingModes } = useAppSelector(
    (state) => state.pipelineMainOptions
  );

  const materialTables: IMaterialTable[] = useMemo(() => {
    const list: IMaterialTable[] = [];
    materials.forEach(({ mechanicalProps, title }) => {
      mechanicalProps.forEach(({ idWorkMode, ...otherProps }) => {
        const mode =
          workingModes.find((wm) => wm.id === idWorkMode)?.title || '';

        list.push({
          ...otherProps,
          title,
          mode,
        });
      });
    });
    return list;
  }, [materials, workingModes]);

  return (
    <div className={styles.container__tag}>
      <Table titles={MATERIAL_TITLES} columns={materialTables} />
      <MaterialModal />
    </div>
  );
};

export default memo(MaterialTable);
