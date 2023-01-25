import React, { memo, useMemo, useState } from 'react';
import { ButtonIcon, Input, Table } from 'shared/ui';
import { useAppSelector } from 'shared/hooks';

const THICKNESS_TITLES = {
  moveUp: ' ',
  moveDown: ' ',
  number: '№ участка',
  thickness: 'Толщина',
  material: 'Материал',
  typePipeline: 'Тип',
  remove: ' ',
  add: ' ',
};

const MOCK = [
  {
    thickness: 4.9,
    material: 'Ст3сп5',
    typePipeline: 'прямая труба',
  },
];

const ThicknessPoint: React.FC = () => {
  const [thicknesses, setThicknesses] = useState(MOCK);
  const { materials } = useAppSelector((state) => state.pipelineMainOptions);

  const list = useMemo(() => {
    const length = thicknesses.length - 1;
    return thicknesses.map((item, index) => ({
      moveUp: (
        <ButtonIcon
          imgScr='/images/arrow-circle-up.svg'
          disabled={!index}
          onClick={() => {
            // setThicknesses
          }}
        />
      ),
      moveDown: (
        <ButtonIcon
          imgScr='/images/arrow-circle-down.svg'
          disabled={index === length}
          onClick={() => {
            // setThicknesses
          }}
        />
      ),
      number: index + 1,
      thickness: (
        <Input
          type='number'
          style={{ width: '45px' }}
          placeholder='мм'
          value={item.thickness}
          onChange={(e) => (item.thickness = +e.target.value)}
        />
      ),
      material: item.material,
      typePipeline: item.typePipeline,
      remove: (
        <ButtonIcon
          imgScr='/images/minus-circle.svg'
          color='red'
          onClick={() => {
            // console.log(length);
            // setThicknesses((prev) => [...prev.slice(index, 1)]);
          }}
        />
      ),
      add: (
        <ButtonIcon
          imgScr='/images/add-circle.svg'
          color='red'
          onClick={() => {
            setThicknesses((prev) => {
              prev.splice(index, 0, { ...item });
              return [...prev];
            });
          }}
        />
      ),
    }));
  }, [thicknesses]);

  if (!materials.length) {
    return (
      <div>
        Для этого пункта меню нужно добавить материал и (или) режим работы
      </div>
    );
  }

  return (
    <div>
      <Table titles={THICKNESS_TITLES} rows={list} />
    </div>
  );
};

export default memo(ThicknessPoint);
