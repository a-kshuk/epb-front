import React, { memo, useMemo } from 'react';
import { Button, ButtonIcon, Input, InputTag, Table } from '@/kits';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MaterialModal from '../MaterialModal/MaterialModal';
import { IMaterial } from '../../../redux';

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
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector((state) => state.pipelineMainOptions);

  const materialTables = useMemo(
    () =>
      materials.map((mode) => ({
        ...mode,
        buttonEdit: (
          <ButtonIcon
            color='red'
            imgScr='/images/edit-2.svg'
            onClick={() => {
              // setId(mode.id);
              // setIsVisible(true);
            }}
          />
        ),
        buttonRemove: (
          <ButtonIcon
            color='red'
            imgScr='/images/close-circle.svg'
            // onClick={() => dispatch(removeWorkMode(mode.id))}
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
      <MaterialModal />
    </div>
  );
};

export default memo(MaterialTable);
