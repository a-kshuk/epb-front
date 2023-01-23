import React, { memo, useMemo, useState } from 'react';
import { Button, ButtonIcon, Table } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MaterialModal from '../MaterialModal/MaterialModal';
import { IMaterial, removeMaterial } from '../../../redux';

import styles from '../MainOptions.modules.scss';

interface IMaterialTable extends Omit<IMaterial, 'id'> {
  title: string;
  buttonEdit: string;
  buttonRemove: string;
}

const MATERIAL_TITLES: Record<keyof IMaterialTable, string> = {
  title: 'Название материала',
  buttonEdit: ' ',
  buttonRemove: ' ',
};

const MaterialTable: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [material, setMaterial] = useState<IMaterial | undefined>();
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector((state) => state.pipelineMainOptions);

  const materialTables = useMemo(
    () =>
      materials.map((item) => ({
        ...item,
        buttonEdit: (
          <ButtonIcon
            color='red'
            imgScr='/images/edit-2.svg'
            onClick={() => {
              setMaterial(item);
              setIsVisible(true);
            }}
          />
        ),
        buttonRemove: (
          <ButtonIcon
            color='red'
            imgScr='/images/close-circle.svg'
            onClick={() => dispatch(removeMaterial(item.id))}
          />
        ),
      })),
    [materials]
  );

  const tableElement = useMemo(
    () =>
      materialTables.length ? (
        <Table titles={MATERIAL_TITLES} rows={materialTables} />
      ) : null,
    [materialTables]
  );

  return (
    <div className={styles.container__table}>
      {tableElement}
      <Button
        onClick={() => {
          setMaterial(undefined);
          setIsVisible(true);
        }}
      >
        Добавить материал
      </Button>
      <MaterialModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        material={material}
      />
    </div>
  );
};

export default memo(MaterialTable);
