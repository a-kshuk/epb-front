import React, { memo, useMemo, useState } from 'react';
import { ButtonIcon, Table } from 'shared/ui';
import MaterialPropsModal from './MaterialPropsModal';
import { IMaterialProps, useMechanicalPropsList } from '../material';

interface IMaterialTable
  extends Omit<IMaterialProps, 'idWorkMode' | 'idMaterial'> {
  material: string;
  mode: string;
  buttonEdit: string;
}

const MATERIAL_TITLES: Record<keyof IMaterialTable, string> = {
  material: 'Название материала',
  mode: 'Режим',
  permissibleStresses: 'Номинальное допускаемое напряжение',
  elasticModulus: 'Модуль упругости',
  linearExpansion: 'Коэффициент линейного расширения',
  buttonEdit: ' ',
};

const MaterialPropsTable: React.FC = () => {
  const [index, setIndex] = useState<number | undefined>();
  const mechanicalProps = useMechanicalPropsList();

  const materialTables = useMemo(() => {
    return mechanicalProps.map((el, index) => {
      return {
        ...el,
        material: el.materialTitle,
        mode: el.modeTitle,
        buttonEdit: (
          <ButtonIcon
            color='red'
            imgScr='/images/edit-2.svg'
            onClick={() => {
              setIndex(index);
            }}
          />
        ),
      };
    });
  }, [mechanicalProps]);

  if (!materialTables.length) {
    return null;
  }

  return (
    <div className={'gap5px'}>
      <Table titles={MATERIAL_TITLES} rows={materialTables} />
      <MaterialPropsModal
        index={index}
        onClose={() => setIndex(undefined)}
        mechanicalProps={mechanicalProps}
      />
    </div>
  );
};

export default memo(MaterialPropsTable);
