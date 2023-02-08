import React, { memo, useMemo, useState } from 'react';
import { Button, ButtonIcon, Table } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import MaterialModal from './MaterialModal';
import { IMaterial, removeMaterial } from '../model';
import { STEEL_TYPE_LABEL } from '../constants';

interface IMaterialTable extends Omit<IMaterial, 'id'> {
  buttonEdit: string;
  buttonRemove: string;
}

const MATERIAL_TITLES: Record<keyof IMaterialTable, string> = {
  title: 'Название материала',
  steelType: 'Тип стали',
  buttonEdit: ' ',
  buttonRemove: ' ',
};

const MaterialTable: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [material, setMaterial] = useState<IMaterial | undefined>();
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector((state) => state.pipelineMaterial);

  const materialTables = useMemo(
    () =>
      materials.map((item) => ({
        title: item.title,
        steelType: STEEL_TYPE_LABEL[item.steelType],
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
    <div className={'gap5px'}>
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
