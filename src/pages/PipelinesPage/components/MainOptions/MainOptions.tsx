import React, { memo, useMemo } from 'react';
import { Button, Input, InputTag } from '@/kits';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setTitle, setRegNumber, setLocation } from '../../redux';

import styles from './MainOptions.modules.scss';

const MainOptions = () => {
  const dispatch = useAppDispatch();
  const { title, regNumber, location, materials, workingModes } =
    useAppSelector((state) => state.pipelineMainOptions);

  const modeTags = useMemo(
    () =>
      workingModes.map((mode) => ({
        label: mode.title,
        onPress: () => {
          console.log('Изменить тип режима работы', mode.id);
        },
      })),
    [workingModes]
  );

  const materialTags = useMemo(
    () =>
      materials.map((material) => ({
        label: material.title,
        onPress: () => {
          console.log('Изменить материал', material.id);
        },
      })),
    [workingModes]
  );

  return (
    <div className={styles.container}>
      <Input
        label='Название трубопровода'
        input={{
          value: title,
          onChange: (e) => dispatch(setTitle(e.target.value)),
          required: true,
        }}
      />
      <Input
        label='Регистрационный номер'
        input={{
          value: regNumber,
          onChange: (e) => dispatch(setRegNumber(e.target.value)),
        }}
      />
      <Input
        label='Местоположение'
        input={{
          value: location,
          onChange: (e) => dispatch(setLocation(e.target.value)),
          required: true,
        }}
      />
      <div className={styles.container__tag}>
        <InputTag label='Режим работы' tags={modeTags} />
        <Button>Добавить режим работы</Button>
      </div>
      <div className={styles.container__tag}>
        <InputTag label='Материалы' tags={materialTags} />
        <Button>Добавить материал</Button>
      </div>
    </div>
  );
};

export default memo(MainOptions);
