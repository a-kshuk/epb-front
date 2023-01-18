import React, { memo, useMemo } from 'react';
import { Table } from '@/kits';
import { useAppSelector } from '@/hooks';
import MaterialMechanicalPropsModal from '../MaterialMechanicalPropsModal/MaterialMechanicalPropsModal';
import { IMaterialMechanicalProps } from '../../../redux';

import styles from '../MainOptions.modules.scss';

interface IMaterialTable
  extends Omit<IMaterialMechanicalProps, 'idWorkMode' | 'idMaterial'> {
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

const MaterialMechanicalPropsTable: React.FC = () => {
  const { materials, workModes, materialMechanicalProps } = useAppSelector(
    (state) => state.pipelineMainOptions
  );

  const materialTables: IMaterialTable[] = useMemo(() => {
    return materialMechanicalProps.map(
      ({ idWorkMode, idMaterial, ...otherProps }) => ({
        title:
          materials.find((material) => material.id === idMaterial)?.title || '',
        mode: workModes.find((mode) => mode.id === idWorkMode)?.title || '',
        ...otherProps,
      })
    );
  }, [materials, workModes]);

  if (!materialTables.length) {
    return null;
  }

  return (
    <div className={styles.container__table}>
      <Table titles={MATERIAL_TITLES} rows={materialTables} />
      <MaterialMechanicalPropsModal />
    </div>
  );
};

export default memo(MaterialMechanicalPropsTable);
