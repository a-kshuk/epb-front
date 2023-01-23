import React, { memo } from 'react';
import { Input } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MaterialMechanicalPropsTable from './MaterialMechanicalPropsTable/MaterialMechanicalPropsTable';
import MaterialTable from './MaterialTable/MaterialTable';
import ModeTable from './ModeTable/ModeTable';
import { setTitle, setRegNumber, setLocation } from '../../redux';

import styles from './MainOptions.modules.scss';

const MainOptions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { title, regNumber, location } = useAppSelector(
    (state) => state.pipelineMainOptions
  );

  return (
    <div className={styles.container}>
      <Input
        label='Название трубопровода'
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        required
      />
      <Input
        label='Регистрационный номер'
        value={regNumber}
        onChange={(e) => dispatch(setRegNumber(e.target.value))}
        required
      />
      <Input
        label='Местоположение'
        value={location}
        onChange={(e) => dispatch(setLocation(e.target.value))}
        required
      />
      <ModeTable />
      <MaterialTable />
      <MaterialMechanicalPropsTable />
    </div>
  );
};

export default memo(MainOptions);
