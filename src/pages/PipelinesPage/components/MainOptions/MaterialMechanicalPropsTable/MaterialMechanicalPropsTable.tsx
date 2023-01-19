import React, { memo, useMemo, useState } from 'react';
import { ButtonIcon, Table } from '@/kits';
import { useAppSelector } from '@/hooks';
import MaterialMechanicalPropsModal from '../MaterialMechanicalPropsModal/MaterialMechanicalPropsModal';
import { IMaterialMechanicalProps } from '../../../redux';

import styles from '../MainOptions.modules.scss';

interface IMaterialTable
  extends Omit<IMaterialMechanicalProps, 'idWorkMode' | 'idMaterial'> {
  material: string;
  mode: string;
  buttonEdit: string;
}

const MATERIAL_TITLES: Record<keyof IMaterialTable, string> = {
  material: 'Название материала',
  mode: 'Режим',
  permissibleStresses: 'Номинальное допускаемое напряжение',
  ovality: 'Овальность',
  elasticModulus: 'Модуль упругости',
  buttonEdit: ' ',
};

const MaterialMechanicalPropsTable: React.FC = () => {
  const [materialTitle, setMaterialTitle] = useState('');
  const [modeTile, setModeTitle] = useState('');
  const [mechanicalProps, setMechanicalProps] = useState<
    IMaterialMechanicalProps | undefined
  >();

  const { materials, workModes, materialMechanicalProps } = useAppSelector(
    (state) => state.pipelineMainOptions
  );

  const materialTables = useMemo(() => {
    return materialMechanicalProps.map((materialProps) => {
      const { idWorkMode, idMaterial, ...otherProps } = materialProps;
      const material =
        materials.find((material) => material.id === idMaterial)?.title || '-';
      const mode =
        workModes.find((mode) => mode.id === idWorkMode)?.title || '-';
      return {
        material,
        mode,
        ...otherProps,
        buttonEdit: (
          <ButtonIcon
            color='red'
            imgScr='/images/edit-2.svg'
            onClick={() => {
              setMechanicalProps(materialProps);
              setMaterialTitle(material);
              setModeTitle(mode);
            }}
          />
        ),
      };
    });
  }, [materials, workModes, materialMechanicalProps]);

  if (!materialTables.length) {
    return null;
  }

  return (
    <div className={styles.container__table}>
      <Table titles={MATERIAL_TITLES} rows={materialTables} />
      <MaterialMechanicalPropsModal
        material={materialTitle}
        workMode={modeTile}
        mechanicalProps={mechanicalProps}
        onClose={() => setMechanicalProps(undefined)}
      />
    </div>
  );
};

export default memo(MaterialMechanicalPropsTable);
